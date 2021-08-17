<template>
  <div>
    <app-bar />
    <v-container class="d-flex flex-column justify-center align-center mt-8">
      <card-post-skeleton v-for="a in 3" :key="a" v-show="isLoading" class="mt-4" />
      <card-post
        v-for="post in posts.data"
        :key="`post-${post.id}`"
        v-show="!isLoading"
        class="mt-4"
        :id="`${post.id}`"
        :title="post.title"
        :shortText="post.short_text"
        :imageUrl="post.image_url"
        :createdAt="post.created_at"
        :creatorName="post.creator_instance.name"
        :hideSettings="user ? true : false"
      />
    </v-container>
    <v-dialog v-if="user" v-model="isDialogTambahActive" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-fab-transition>
          <v-btn
            v-show="!isDialogTambahActive"
            class="fab-tambah"
            fab
            dark
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Tambah Artikel</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="val.judul"
                  label="Judul"
                  required
                  counter
                  clearable
                  :readonly="isLoadingPost"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="val.content"
                  name="input-7-1"
                  label="Isi Artikel"
                  clearable
                  counter
                  :readonly="isLoadingPost"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="val.gambar"
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="Gambar Artikel"
                  counter
                  clearable
                  :show-size="1000"
                  :readonly="isLoadingPost"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="isLoadingPost"
            color="primary"
            text
            @click="isDialogTambahActive = false"
          >
            Batal
          </v-btn>
          <v-btn :loading="isLoadingPost" color="primary" dark @click="onSubmitPost()">
            Tambah Posting
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CardPost from '@/components/CardPost.vue';
import AppBar from '../components/AppBar.vue';
import CardPostSkeleton from '../components/skeleton/CardPost.vue';
import ArtikelService from '../services/artikel.service';

export default {
  name: 'Home',
  components: {
    CardPost,
    AppBar,
    CardPostSkeleton,
  },
  data() {
    return {
      isLoading: true,
      isLoadingPost: true,
      isDialogTambahActive: false,
      user: JSON.parse(localStorage.getItem('user')),
      posts: { data: [] },
      rules: [(value) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'],
      val: { judul: '', content: '', gambar: null },
    };
  },
  async mounted() {
    const resArtikel = await ArtikelService.getListPost().catch((e) => e);
    if (resArtikel.status === 200) {
      this.posts = resArtikel.data;
    }
    this.isLoading = false;
  },
  methods: {
    async onSubmitPost() {
      this.isLoadingPost = true;
      const res = await ArtikelService.postPost({
        title: this.val.judul,
        content: this.val.content,
        image: this.val.gambar,
      });
      if (res.status === 200) {
        const resArtikel = await ArtikelService.getListPost().catch((e) => e);
        if (resArtikel.status === 200) {
          this.posts = resArtikel.data;
        }
      }
      this.isLoadingPost = false;
      this.isDialogTambahActive = false;
    },
  },
};
</script>

<style lang="scss">
.fab-tambah {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
}
</style>
