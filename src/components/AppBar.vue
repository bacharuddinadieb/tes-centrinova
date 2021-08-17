<template>
  <v-app-bar app color="white">
    <div class="d-flex align-center">
      <v-btn v-if="$route.name === 'DetailPost'" class="mr-4" icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        :src="require('../assets/blogu.png')"
        transition="scale-transition"
        width="40"
      />

      <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
    </div>

    <v-spacer></v-spacer>
    <v-dialog v-if="user" v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" depressed fab dark small color="primary" v-bind="attrs" v-on="on">
          {{ nameInitials(user.name) }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Perbarui Akun</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="form" v-model="isValid" lazy-validation>
                  <v-text-field
                    v-model="val.nama"
                    :rules="rules.nama"
                    label="Nama"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="val.email"
                    :rules="rules.email"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="val.password"
                    :append-icon="val.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="val.showPassword ? 'text' : 'password'"
                    :rules="rules.password"
                    label="Password"
                    counter
                    required
                    @click:append="val.showPassword = !val.showPassword"
                  ></v-text-field>
                  <v-text-field
                    v-model="val.konfPassword"
                    :append-icon="val.showKonfPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="val.showKonfPassword ? 'text' : 'password'"
                    :rules="rules.konfPassword"
                    label="Konfirmasi Password"
                    counter
                    required
                    @click:append="val.showKonfPassword = !val.showKonfPassword"
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn v-else text color="primary" to="/login">
      Masuk
    </v-btn>
  </v-app-bar>
</template>

<script>
import nameInitials from 'name-initials';

export default {
  name: 'AppBar',
  data() {
    return {
      dialog: false,
      isValid: true,
      error: null,
      user: JSON.parse(localStorage.getItem('user')),
      val: {
        nama: '',
        email: '',
        password: '',
        konfPassword: '',
        showPassword: false,
        showKonfPassword: false,
        ingatSaya: false,
      },
      rules: {
        email: [
          () => this.error === null || '',
          (v) => /.+@.+\..+/.test(v) || 'Pastikan format email benar',
        ],
        nama: [
          () => this.error === null || '',
          (v) => (v && v.length !== 0) || 'Nama tidak boleh kosong',
        ],
        password: [() => this.error === null || ''],
        konfPassword: [
          () => this.error === null || '',
          (v) => v === this.val.password || 'Pastikan konfirmasi password sama',
        ],
      },
    };
  },
  methods: {
    nameInitials,
  },
};
</script>

<style></style>
