<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column is-3 ">
              <b-icon
                  pack="fas"
                  :icon="icon"
              >
              </b-icon>
            </div>
            <div class="column ">
              <h3>
                {{ title }}
              </h3>
            </div>
          </div>
          <div class="columns">
          <div class="caption">
            {{caption }}
          </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>
<script>


export default {
  data: function () {
    return {
    }
  },
  beforeMount() {

  },
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }

  }
}
</script>
<style>
.card{
  border-radius: 20px;
  padding: 60px 40px;
}
.caption{
  font-size: 23px;
}
.fas:before {
  font-size: 80px;
}
</style>
