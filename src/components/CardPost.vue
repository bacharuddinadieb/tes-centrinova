<template>
  <v-card
    elevation="4"
    class="card-post"
    hover
    ripple
    @click.native.stop="$router.push(`detail/${id}`)"
  >
    <div class="d-flex justify-space-between align-center ma-4">
      <div class="d-flex justify-center align-center">
        <v-avatar v-if="creatorName !== ''" color="teal" size="36">
          <span class="white--text">{{ nameInitials(creatorName) }}</span>
        </v-avatar>
        <div class="ml-2">
          <h4 class="mb-n1">{{ creatorName }}</h4>
          <span style="font-size: .8rem">{{
            createdAt !== ''
              ? dayjs(createdAt).calendar(null, {
                  sameDay: '[Hari ini] DD MMM YYYY, HH:mm',
                  nextDay: '[Besok] DD MMM YYYY, HH:mm',
                  nextWeek: 'dddd MMM YYYY, HH:mm',
                  lastDay: '[Kemarin] DD MMM YYYY, HH:mm',
                  lastWeek: 'dddd MMM YYYY, HH:mm',
                  sameElse: 'DD MMM YYYY, HH:mm',
                })
              : ''
          }}</span>
        </div>
      </div>
      <v-menu v-if="hideSettings" bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon large v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link>
            <v-list-item-title v-text="'Perbarui'" />
            <v-list-item-icon>
              <v-icon v-text="'mdi-pencil'" />
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title class="red--text" v-text="'Hapus'" />
            <v-list-item-icon>
              <v-icon color="red" v-text="'mdi-delete'" />
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-img v-if="imageUrl" :src="imageUrl" max-height="40vh"></v-img>
    <v-img v-else :src="require('../assets/not-found.png')" max-height="40vh"></v-img>
    <v-divider />
    <v-card-text>
      <h2 class="mb-2">{{ title }}</h2>
      {{ shortText }}
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import nameInitials from 'name-initials';

require('dayjs/locale/id');

dayjs.locale('id');
dayjs.extend(calendar);

export default {
  name: 'CardPost',
  props: {
    id: { type: String, default: '' },
    title: { type: String, default: '' },
    shortText: { type: String, default: '' },
    imageUrl: { type: String, default: null },
    createdAt: { type: String, default: '' },
    creatorName: { type: String, default: '' },
    hideSettings: { type: Boolean, default: true },
  },
  methods: {
    dayjs,
    nameInitials,
  },
};
</script>

<style>
.v-card.card-post {
  width: 100%;
  max-width: 768px;
  min-width: 256px;
  cursor: pointer;
}
</style>
