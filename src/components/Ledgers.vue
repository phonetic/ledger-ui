<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Ledgers</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-expansion-panel v-model="panel" expand>
          <v-expansion-panel-content :key="1">
            <template v-slot:header>
              <div>Create New Ledger</div>
            </template>
            <v-card>
              <LedgerForm :showCancel="true" buttonAction="Create" v-on:closePanel="closePanel" v-on:newLedgerSuccess="newLedgerSuccess"/>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-list two-line>
          <template v-for="(ledger, index) in ledgers">
            <v-subheader :key="ledger.header" v-if="ledger.header" :Ledger="ledger.header">{{ ledger.header }}</v-subheader>
            <v-divider :key="index" v-else-if="index != 0" :Ledger="index"></v-divider>
            <v-list-tile :key="ledger.ledger_id" :Ledger="index" :to="'/ledgers/' + ledger.ledger_id">
              <v-list-tile-content>
                <v-list-tile-title v-html="ledger.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="ledger.description"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
      <div class="text-xs-center">
        <v-pagination v-model="page" :length="totalPages" :total-visible="7"></v-pagination>
      </div>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
    </v-snackbar>
  </v-layout>
</template>

<script>
import axios from "axios";
import LedgerForm from './LedgerForm'

export default {
  components: {
    LedgerForm
  },
  data() {
    return {
      page: 1,
      perPage: 5,
      totalPages: 0,
      ledgers: [],
      panel: [],
      
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 5000,
      text: '',
    };
  },
  methods: {
    closePanel: function() {
      this.panel = [];
    },
    newLedgerSuccess() {
      this.text = 'Successfully added ledger: ' + this.ledgerName;
      
      this.ledgerName = '';
      this.ledgerDescription = '';
      this.ledgerActions = '';

      this.closePanel();

      this.snackbar = true;

      this.fetchAndRenderLedgers(this.page, this.perPage);
    },
    fetchLedgers(page, limit) {
      return axios.get(
        process.env.VUE_APP_API_ENDPOINT + process.env.VUE_APP_API_STAGE + "/ledgers?_page=" +
          page +
          "&_limit=" +
          limit
      );
    },
    fetchAndRenderLedgers(page, limit) {
      this.fetchLedgers(page, limit)
        .then(res => {
          this.totalPages = Math.ceil(
            res.headers["x-total-count"] / this.perPage
          );
          this.ledgers = res.data;
        })
        .catch(err => console.log(err));
    },
  },
  created() {
    this.fetchAndRenderLedgers(this.page, this.perPage);
  },
  watch: {
    page: function() {
      this.fetchAndRenderLedgers(this.page, this.perPage);
    }
  },
};
</script>