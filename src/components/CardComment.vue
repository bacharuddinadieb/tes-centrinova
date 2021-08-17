<template>
  <div class="d-flex justify-start">
    <v-avatar color="teal" size="36">
      <span class="white--text">{{ nameInitials(creatorName) }}</span>
    </v-avatar>
    <div class="ml-2">
      <p class="mb-0">
        <b>{{ creatorName }}</b> ·
        <span style="font-size: .9rem">{{
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
      </p>
      <p>
        {{ comment }}
      </p>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import nameInitials from 'name-initials';

require('dayjs/locale/id');

dayjs.locale('id');
dayjs.extend(calendar);

export default {
  name: 'CardComment',
  props: {
    id: { type: String, default: '' },
    createdAt: { type: String, default: '' },
    creatorName: { type: String, default: '' },
    comment: { type: String, default: '' },
  },
  methods: {
    dayjs,
    nameInitials,
  },
};
</script>

<style></style>
