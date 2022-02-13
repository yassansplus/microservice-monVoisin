<template>
  <div class="container">
    <section class="row payment-form">
      <h5 class="#e0e0e0 grey lighten-4">
        Payment Method
        <span class="right">

            Payer {{ room.author.nom }} {{
            room.author.prenom
          }} {{ room.annonce.prix }}

        </span>
      </h5>
      <div class="row">
        <div class="col-md-6 col-lg-4 s12 card-element">
          <label>Card Number</label>
          <div id="card-number-element" class="input-value form-control form-control-border"></div>
        </div>
        <div class="col-md-6 col-lg-4 s6 card-element">
          <label>Expiry Date</label>
          <div id="card-expiry-element"></div>
        </div>
        <div class="col-md-6 col-lg-4 s6 card-element">
          <label>CVC</label>
          <div id="card-cvc-element"></div>
        </div>
      </div>
      <div class="error red text-center white-text">{{ stripeValidationError }}</div>
      <div class="row mt-3">
        <div class="col s12 place-order-button-block text-center">
          <b-button type="is-primary is-light"
                    @click.prevent="placeOrder"

          >
            Payer {{ room.annonce.prix }} €
          </b-button>

          <!--          <button class="btn btn-primary mt-2" type="button" @click.prevent="placeOrder">Place Order</button>-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import routeList from '../../entity/routeList';
import axios from 'axios';

export default {
  name: 'paiement',
  props: ["room"],
  data() {
    return {
      stripe: null,
      cardNumberElement: null,
      cardExpiryElement: null,
      cardCVCElement: null,
      stripeValidationError: '',
    }
  },
  mounted() {
    if (this.room === undefined) {
      this.$router.push('/mes-demandes')
    }
    this.stripe = this.$stripe; // add your stripe key
    this.createAndMountFormElements()
  },
  methods: {
    async paymentMethodReq() {
      const paymentMethodReq = await this.stripe.createPaymentMethod({
        type: "card",
        card: this.cardNumberElement,
      });

      if (paymentMethodReq.error) {
        this.loading = false;
        this.error = paymentMethodReq.error.message;
        return 0;
      }

      return paymentMethodReq;
    },

    async confirmPayment(paymentMethodReq, secret) {
      const responseConfirmPayment = await this.stripe.confirmCardPayment(secret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (responseConfirmPayment.error) {
        this.error = responseConfirmPayment.error.message;
        return 0;
      } else if (responseConfirmPayment.paymentIntent) {
        //code success
        // console.log(responseConfirmPayment.paymentIntent)
        return responseConfirmPayment.paymentIntent
      }
    },
    createAndMountFormElements() {
      var elements = this.stripe.elements();
      this.cardNumberElement = elements.create('cardNumber');
      this.cardNumberElement.mount('#card-number-element');
      this.cardExpiryElement = elements.create('cardExpiry');
      this.cardExpiryElement.mount('#card-expiry-element');
      this.cardCvcElement = elements.create('cardCvc');
      this.cardCvcElement.mount('#card-cvc-element');
      this.cardNumberElement.on('change', this.setValidationError);
      this.cardExpiryElement.on('change', this.setValidationError);
      this.cardCvcElement.on('change', this.setValidationError);
    },
    setValidationError(event) {
      this.stripeValidationError = event.error ? event.error.message : ''
    },
    placeOrder() {
      this.stripe.createToken(this.cardNumberElement).then(result => {
        if (result.error) {
          this.stripeValidationError = result.error.message
        } else if (result.token) {
          const user = JSON.parse(this.$cookie.get('user'));
          axios.post(routeList.paiement, {token: result.token, user, room: this.room}).then(async (res) => {
                const payment = await this.paymentMethodReq();
                const confirm = await this.confirmPayment(payment, res.data.client_secret);
                if (confirm.status === "succeeded") {
                  const enregistrement = await axios.post(routeList.paiement + '/success', {
                    room: this.room,
                    roomId: this.room.id,
                    userPayer: user.id,
                    userReceiverId: this.room.firstParticipant,
                    paiementId: confirm.id
                  });
                  if (enregistrement) {
                    this.$buefy.toast.open({
                      duration: 3000,
                      message: 'Paiement accepté !!',
                      type: 'is-success'
                    });
                  }

                  await this.$router.push({name: 'chat', params: {room: this.room, hasPaied: true}})
                }
              }
          );
        }
      })
    }
  }
}
</script>

<style>
.payment-form {
  max-width: 100%;
  margin: 20px auto;
  border: 1px solid #ececec;
}

.payment-form h5 {
  margin: 0;
  padding: 10px;
  font-size: 1.2rem;
}

.card-element {
  margin-top: 5px;
}

#card-number-element,
#card-expiry-element,
#card-cvc-element {
  background: white;
  padding: 5px;
  border: 1px solid #ececec;
}

.place-order-button-block {
  margin: 10px 0;
}

button {

}
</style>
