<template>
<div>
<div>
  <div class="card card-inscription column is-4 is-offset-4">
    <div class="card-content">
      <div class="content">

        <h1 class="has-text-centered">
          <slot name="title">Connexion</slot>
        </h1>
        <slot name="form"></slot>

      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>

export default {
  name: 'form-modal'
}
</script>
