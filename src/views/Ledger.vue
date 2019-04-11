<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title><router-link :to="{ name: 'ledgers' }">Ledgers</router-link> &gt; {{ id }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <LedgerForm  :showCancel="false" buttonAction="Save" :ledgerId=id />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
import LedgerForm from "../components/LedgerForm";

export default {
  data() {
    return {
      apiResponse: 0,
    }
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    LedgerForm
  },
  methods: {
  }

};
</script>