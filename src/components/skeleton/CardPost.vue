<template>
  <v-card elevation="4" class="card-post-loading">
    <div class="d-flex justify-space-between align-center ma-4">
      <div class="d-flex justify-center align-center">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <div class="ml-2">
          <v-skeleton-loader width="300" max-width="40vw" type="text"></v-skeleton-loader>
          <v-skeleton-loader width="200" max-width="30vw" type="text"></v-skeleton-loader>
        </div>
      </div>
      <!-- <v-skeleton-loader type="avatar" bottom left></v-skeleton-loader> -->
    </div>
    <v-skeleton-loader type="image" max-height="40vh"></v-skeleton-loader>
    <v-divider />
    <v-card-text>
      <v-skeleton-loader
        class="mb-4 mt-4"
        type="heading"
        width="600"
        max-width="80vw"
      ></v-skeleton-loader>
      <v-skeleton-loader type="paragraph" width="600" max-width="80vw"></v-skeleton-loader>
      <v-skeleton-loader type="paragraph" width="500" max-width="80vw"></v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CardPostSkeleton',
  methods: {
    doSomething() {
      this.$router.push(`detail/${1}`);
    },
  },
};
</script>

<style>
.v-card.card-post-loading {
  width: 100%;
  max-width: 768px;
  min-width: 256px;
  cursor: progress;
}
</style>
