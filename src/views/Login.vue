<template>
  <v-container fluid class="login-container d-flex flex-column justify-center align-center">
    <v-container align-self="center" class="d-flex justify-center align-center">
      <v-slide-y-reverse-transition>
        <v-card
          align-self="center"
          elevation="4"
          class="pa-8 d-flex justify-center align-center"
          style="width: 100%; max-width: 1264px; min-height: 60vh"
          v-if="show"
        >
          <v-container class="icon-container">
            <v-img :src="require('../assets/blogu.png')" contain width="48px" height="48px" />
          </v-container>
          <v-btn class="close-container" icon color="error" to="/">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-row no-gutters class="d-flex justify-center align-center">
            <v-col :cols="0" :md="6" class="d-flex justify-center align-center">
              <v-img :src="require('../assets/bg-login.png')" class="my-3" contain width="20vw" />
            </v-col>
            <v-col :cols="12" :md="6" class="pa-xs-0 pa-md-4 pa-lg-4">
              <h2 class="text-center">Selamat Datang</h2>
              <p class="text-center">Silahkan masuk untuk mulai menambahkan post</p>
              <v-form
                ref="form"
                v-model="isValid"
                lazy-validation
                @submit.prevent="onSubmitFormLogin()"
              >
                <v-text-field
                  v-model="val.email"
                  :rules="rules.email"
                  label="E-mail"
                  required
                  :readonly="isLoading"
                  @focus="resetValidation"
                ></v-text-field>
                <v-text-field
                  v-model="val.password"
                  :append-icon="val.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="val.showPassword ? 'text' : 'password'"
                  :rules="rules.password"
                  label="Password"
                  counter
                  required
                  :readonly="isLoading"
                  @click:append="val.showPassword = !val.showPassword"
                  @focus="resetValidation"
                ></v-text-field>
                <!-- <router-link to="/">Home</router-link> -->
                <v-btn block color="primary" class="mt-4" type="submit" :loading="isLoading">
                  Masuk
                </v-btn>
              </v-form>

              <p class="mt-4">
                Belum punya akun? silahkan register
                <a href="https://dev-sample-api.e-learning.co.id/register">disini</a>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-slide-y-reverse-transition>
    </v-container>
  </v-container>
</template>

<script>
import AuthService from '../services/auth.service';

export default {
  name: 'Login',
  data() {
    return {
      show: false,
      isValid: true,
      error: null,
      isLoading: false,
      val: {
        email: '',
        password: '',
        showPassword: false,
      },
      rules: {
        email: [
          () => this.error === null || '',
          (v) => /.+@.+\..+/.test(v) || 'Pastikan format email benar',
        ],
        password: [() => this.error === null || 'Username atau Password salah'],
      },
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    resetValidation() {
      if (this.error !== null) {
        this.$refs.form.resetValidation();
        this.error = null;
      }
    },
    async onSubmitFormLogin() {
      this.isLoading = true;
      const resLogin = await AuthService.login({
        email: this.val.email,
        password: this.val.password,
      }).catch((e) => e);
      const resMe = await AuthService.me().catch((e) => e);
      this.isLoading = false;
      if (resLogin.status === 200 && resMe.status === 200) {
        this.error = null;
        this.$router.push('/');
      }
      this.error = resLogin;
      this.validate();
    },
  },
};
</script>

<style lang="scss">
body {
  background: linear-gradient(321.77deg, #e3e0ff 70%, #ffffff 114.96%);
}
.login-container {
  min-height: 100vh;
  background-image: url('../assets/ell.svg'),
    linear-gradient(321.77deg, #e3e0ff 5%, #ffffff 114.96%);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.icon-container {
  position: absolute;
  top: 16px;
  left: 16px;
}
.close-container {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
