<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>API Keys</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            fab
            small
            color="blue accent-2"
            bottom
            right
            absolute
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(key, index) in keys">
            <v-subheader v-if="key.header" :key="key.header">{{ key.header }}</v-subheader>
            <v-divider v-else-if="index != 0" :key="index"></v-divider>
            <v-subheader v-else></v-subheader>
            <v-list-tile :key="index" :to="'/keys/' + key.id">
              <v-list-tile-content>
                <v-list-tile-title v-html="key.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="key.title"></v-list-tile-sub-title>
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
        <v-pagination v-model="page" :length="totalPages" :total-visible=7></v-pagination>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      page: 1,
      perPage: 10,
      totalPages: 0,
      keys: []
    };
  },
  methods: {
    fetchKeys(page, limit) {
      return axios.get(
        "https://jsonplaceholder.typicode.com/todos?_page=" +
          page +
          "&_limit=" +
          limit +
          "&_sort=id&_order=desc&userId=5"
      );
    },
    fetchAndRenderKeys(page, limit) {
      this.fetchKeys(page, limit)
        .then(res => {
          this.totalPages = Math.ceil(
            res.headers["x-total-count"] / this.perPage
          );
          this.keys = res.data;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.fetchAndRenderKeys(this.page, this.perPage);
  },
  watch: {
    page: function() {
      this.fetchAndRenderKeys(this.page, this.perPage);
    }
  }
};
</script>