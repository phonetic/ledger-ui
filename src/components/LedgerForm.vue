<template>
  <v-layout column>
    <div>
      <v-progress-linear v-if="ledgerId && apiResponse == 0" :indeterminate="true"></v-progress-linear>
    </div>
    <v-form v-if="apiResponse == 200 || !ledgerId" v-model="valid">
      <v-container>
        <v-layout column>
          <v-flex>
            <v-text-field v-model="ledgerName" label="Ledger Name" required></v-text-field>
          </v-flex>
          <v-flex>
            <v-textarea
              v-model="ledgerDescription"
              label="Ledger Description"
              value="Remind yourself a little bit about what this ledger will be used for..."
            ></v-textarea>
          </v-flex>
          <v-flex>
            <v-combobox
              v-model="ledgerActions"
              :search-input.sync="search"
              label="What actions can take place in this ledger?"
              multiple
              presistent-hint
              small-chips
            >
              <template v-slot:no-data>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Press
                      <kbd>enter</kbd> to add "
                      <strong>{{ search }}</strong>".
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-combobox>
          </v-flex>
          <v-flex>
            <v-btn @click="submit">{{buttonAction}} Ledger</v-btn>
            <v-btn v-if="showCancel" @click="closePanel">Cancel</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <div>
      <v-alert :value="apiResponse > 299" type="error">No entry found with id: {{ ledgerId }}</v-alert>
    </div>
  </v-layout>
</template>

<script>
import axios from "axios";
//import { API_STAGE } from '../config'
//import { API_ENDPOINT } from '../config'

export default {
  props: {
    buttonAction: {
      type: String,
      default: "Create"
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    ledgerId: {
      type: String,
      defult: null
    }
  },
  data() {
    return {
      valid: true,
      search: null,
      ledgerName: null,
      ledgerDescription: null,
      ledgerActions: null,
      apiResponse: 0
    };
  },
  methods: {
    closePanel: function() {
      this.$emit("closePanel");
    },
    submit: function() {
      if (this.$props.ledgerId) {
        //do thing
      } else {
        axios
          .post(
            process.env.VUE_APP_API_ENDPOINT + process.env.VUE_APP_API_STAGE + '/ledgers',
            {
              name: this.ledgerName,
              description: this.ledgerDescription,
              actions: this.ledgerActions
            }
          )
          .then(() => this.newLedgerSuccess())
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    newLedgerSuccess() {
      this.$emit("newLedgerSuccess");
    },
    fetchLedger(id) {
      console.log( 'Getting: ' + process.env.VUE_APP_API_ENDPOINT + process.env.VUE_APP_API_STAGE + "/ledgers/" + id )
      return axios
        .get(
          process.env.VUE_APP_API_ENDPOINT + process.env.VUE_APP_API_STAGE + "/ledgers/" + id
        )
        .then(res => this.fetchedLedger(res))
        .catch(err => this.errorGettingLedger(err));
    },
    errorGettingLedger(err) {
      this.apiResponse = 999;
      console.log(err);
    },
    fetchedLedger(res) {
      this.ledgerName = res.data["name"];
      this.ledgerDescription = res.data["description"];
      this.ledgerActions = res.data["actions"];
      this.apiResponse = res.status;
    }
  },
  created() {
    if (this.$props.ledgerId) {
      this.fetchLedger(this.$props.ledgerId);
    }
  }
};
</script>