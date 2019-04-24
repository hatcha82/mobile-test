<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="primary"
          title="Simple Table"
          text="Here is a subtitle for this table"
        >
          <v-card>
            <v-card-title>
              Nutrition
              <v-spacer/>
              <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
              />
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items.BM_EDI_DOC_ID"
              :expand="expand"
              :search="search"
              hide-actions
              item-key="CODE_CD"
            >
              <template v-slot:items="props">
                <tr @click="props.expanded = !props.expanded">
                  <td>{{ props.item.CODE_CD }}</td>
                  <td >{{ props.item.CODE_NM }}</td>
                  <td >{{ props.item.CODE_DESC }}</td>
                </tr>
              </template>
              <template v-slot:expand="props">
                {{ props.item.CODE_NM }}
              </template>
            </v-data-table>
        </v-card></material-card>
      </v-flex>
      <v-flex
        md12
      >
        <!--  -->
        <material-card
          color="info"
          full-width
          title="Table on Plain Background"
          text="Here is a subtitle for this table"
        >
          <v-data-table
            :headers="headers"
            :items="items.NAT_CD"

            color="primary"
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"

            >
              <router-link
                to="/login"
                tag="tr" >
                <td>{{ item.CODE_CD }}</td>
                <td>{{ item.CODE_NM }}</td>
                <td>{{ item.USE_FLAG }}</td>
                <td class="text-xs-right">{{ item.salary }}</td>
              </router-link>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    expand: true,
    pagination: {

    },
    search: '',
    headers: [
      {
        sortable: true,
        text: 'Code',
        value: 'CODE_CD'
      },
      {
        sortable: true,
        text: 'Name',
        value: 'CODE_NM'
      },
      {
        sortable: false,
        text: 'Desciption',
        value: 'CODE_DESC'
      }
    ],
    items: {
      NAT_CD: [],
      BM_EDI_DOC_ID: []
    }
  }),
  mounted () {
    this.$nextTick(function () {
      this.getCodeMst()
    })
  },
  methods: {
    test: function () {
      alert()
    },
    getCodeMst: async function () {
      // var param = Object.assign(this.userInfo, { CODE_GROUP_CD: 'NAT_CD' })
      var param = { CODE_GROUP_CD: 'NAT_CD' }
      var result = await this.$http.post(`/popup/getCommonCode.json`, param)
      this.items.NAT_CD = result.data.O_RESULT
      param = { CODE_GROUP_CD: 'BM_EDI_DOC_ID' }
      result = await this.$http.post(`/popup/getCommonCode.json`, param)
      this.items.BM_EDI_DOC_ID = result.data.O_RESULT
    }
  }
}
</script>
