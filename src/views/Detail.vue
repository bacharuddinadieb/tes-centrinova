<template>
  <div>
    <app-bar />
    <div v-if="isLoading">
      <v-skeleton-loader width="100vw" max-height="60vh" type="image"></v-skeleton-loader>
      <v-container class="mt-4" style="max-width: 960px">
        <v-skeleton-loader width="50vw" max-width="600px" type="heading"></v-skeleton-loader>
        <div class="d-flex justify-start align-center mb-6 mt-4">
          <v-skeleton-loader type="avatar"></v-skeleton-loader>
          <div class="ml-2">
            <v-skeleton-loader width="10vw" max-width="300px" type="text"></v-skeleton-loader>
          </div>
        </div>
        <v-skeleton-loader type="paragraph" width="600" max-width="80vw"></v-skeleton-loader>
        <v-skeleton-loader type="paragraph" width="500" max-width="80vw"></v-skeleton-loader>
        <br />
        <v-skeleton-loader type="paragraph" width="600" max-width="80vw"></v-skeleton-loader>
        <v-skeleton-loader type="paragraph" width="500" max-width="80vw"></v-skeleton-loader>
        <br />
        <v-skeleton-loader type="paragraph" width="600" max-width="80vw"></v-skeleton-loader>
        <v-skeleton-loader type="paragraph" width="500" max-width="80vw"></v-skeleton-loader>
        <br />
        <v-skeleton-loader type="paragraph" width="600" max-width="80vw"></v-skeleton-loader>
        <v-skeleton-loader type="paragraph" width="500" max-width="80vw"></v-skeleton-loader>
      </v-container>
    </div>
    <div v-if="!isLoading">
      <v-img v-if="posts.image_url" :src="posts.image_url" max-height="60vh"></v-img>
      <v-img v-else :src="require('../assets/not-found.png')" max-height="60vh"></v-img>
      <v-container class="mt-4" style="max-width: 960px">
        <h1>{{ posts.title }}</h1>
        <div class="d-flex justify-start align-center mb-6">
          <v-avatar color="teal" size="36">
            <span class="white--text">{{ nameInitials(posts.creator_instance.name) }}</span>
          </v-avatar>
          <div class="ml-2">
            <p class="mb-n1">
              <b>{{ posts.creator_instance.name }}</b> ·
              <span style="font-size: .8rem">{{
                posts.created_at
                  ? dayjs(posts.created_at).calendar(null, {
                      sameDay: '[Hari ini] DD MMM YYYY, HH:mm',
                      nextDay: '[Besok] DD MMM YYYY, HH:mm',
                      nextWeek: 'dddd MMM YYYY, HH:mm',
                      lastDay: '[Kemarin] DD MMM YYYY, HH:mm',
                      lastWeek: 'dddd MMM YYYY, HH:mm',
                      sameElse: 'DD MMM YYYY, HH:mm',
                    })
                  : ''
              }}</span>
            </p>
          </div>
        </div>
        <p style="white-space: pre-line">{{ posts.content }}</p>
        <v-container class="pa-0 pt-4">
          <v-divider class="mb-4 mt-4"></v-divider>
          <div class="d-flex justify-start mb-2" style="width: 100%">
            <v-avatar color="teal" size="36">
              <span v-if="user" class="white--text">{{ nameInitials(user.name) }}</span>
              <v-icon v-else dark>
                mdi-account
              </v-icon>
            </v-avatar>
            <div class="ml-2" style="width: 100%">
              <v-form
                ref="form"
                v-model="isValid"
                lazy-validation
                @submit.prevent="onSubmitKomentar()"
              >
                <v-text-field
                  v-model="val.nama"
                  class="pt-0"
                  label="Nama"
                  required
                  style="width: 100%"
                  :readonly="user || isLoadingKomentar ? true : false"
                ></v-text-field>
                <v-textarea
                  v-model="val.komentar"
                  :rules="rules.komentar"
                  class="mt-0"
                  name="input-7-1"
                  label="Komentar"
                  clearable
                  counter
                  :readonly="isLoadingKomentar"
                />
                <v-scroll-y-transition leave-absolute hide-on-leave>
                  <div v-if="val.komentar !== ''" class="d-flex justify-end mb-8">
                    <v-btn text type="button" @click="val.komentar = ''">
                      Batal
                    </v-btn>
                    <v-btn :loading="isLoadingKomentar" color="primary" dark type="submit">
                      Kirim
                    </v-btn>
                  </div>
                </v-scroll-y-transition>
              </v-form>
            </div>
          </div>
          <p>{{ komentar.data.length }} Komentar</p>
          <card-comment
            v-for="koment in komentar.data"
            :key="`koment-${koment.id}`"
            :id="koment.id"
            :createdAt="koment.created_at"
            :creatorName="koment.name"
            :comment="koment.comment"
          />
        </v-container>
      </v-container>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import nameInitials from 'name-initials';
import CardComment from '@/components/CardComment.vue';
import AppBar from '../components/AppBar.vue';
import ArtikelService from '../services/artikel.service';
import KomentarService from '../services/komentar.service';

require('dayjs/locale/id');

dayjs.locale('id');
dayjs.extend(calendar);

export default {
  name: 'Detail',
  components: {
    CardComment,
    AppBar,
  },
  data() {
    return {
      isLoading: true,
      isLoadingKomentar: false,
      user: JSON.parse(localStorage.getItem('user')),
      posts: { title: '' },
      komentar: {},
      val: {
        nama: '',
        komentar: '',
      },
      rules: {
        komentar: [(v) => (v && v.length >= 20) || 'Komentar harus lebih dari 20 karakter'],
      },
    };
  },
  async mounted() {
    const resArtikel = await ArtikelService.getPost(this.$route.params.id).catch((e) => e);
    const resKomentar = await KomentarService.getListKomentar(this.$route.params.id).catch(
      (e) => e,
    );
    if (resArtikel.status === 200) {
      this.posts = { ...resArtikel.data };
    }
    if (resKomentar.status === 200) {
      this.komentar = { ...resKomentar.data };
    }
    this.val.nama = this.user ? this.user.name : '';
    this.isLoading = false;
  },
  methods: {
    async onSubmitKomentar() {
      this.isLoadingKomentar = true;
      const res = await KomentarService.postKomentar(this.$route.params.id, {
        name: this.val.nama,
        comment: this.val.komentar,
      });
      if (res.status === 200) {
        const resKomentar = await KomentarService.getListKomentar(this.$route.params.id).catch(
          (e) => e,
        );
        if (resKomentar.statue === 200) {
          this.komentar = { ...resKomentar.data };
        }
      }
      this.isLoadingKomentar = true;
    },
    dayjs,
    nameInitials,
  },
};
</script>

<style></style>
