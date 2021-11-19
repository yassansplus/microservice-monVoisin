<template>
  <section class="columns mt-30">
    <div class="is-2  is-offset-1 column annonce-image">

    </div>
    <div class="is-8 column is-paddingless">
      <div class="card card-annonce">
        <div class="card-content">
          <h2 class="title-annonce">
            <router-link to="/">Cours de guitare</router-link>
          </h2>
          <div class="content">
            <ul>
              <li>
                <b-icon
                    icon="map-marker-radius-outline">
                </b-icon>
                <span>Franconville</span>
              </li>
              <li>
                <b-icon
                    icon="dots-square">
                </b-icon>
                <span>Musique</span>
              </li>
              <li>
                <b-icon
                    icon="cash-multiple">
                </b-icon>
                <span>5€</span>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>
<style>
select {
  width: 100%;
}

.title-annonce {
  font-size: 1.3rem;
  font-weight: bold;
}

.annonce-image {
  background: url("https://picsum.photos/200") no-repeat;
  background-size: cover;
  height: 180px;
}

.content li {
  list-style: none;
  margin-top: 5px !important;
}

.mt-30 {
  margin-top: 30px;
}

.card-annonce {
  height: 180px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
