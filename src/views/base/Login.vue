<template>
  <div>
    <v-container
      fill-height
      fluid
    >
      <v-layout
        align-center
        justify-center
      >
        <v-flex
          xs12
          sm8
          md4>
          <material-card
            color="primary"
            title="Login"
            text="KEROL ID"
            class="elevation-12">
            <v-form>
              <v-container py-0>
                <v-layout wrap>
                  <v-flex
                    xs12
                    md12
                  >
                    <v-text-field
                      v-model="user.id"
                      class="purple-input"
                      label="User Name"
                    />
                    <v-text-field
                      v-model="user.pw"
                      type="password"
                      label="password"
                      class="purple-input password"/>
                  </v-flex>

                  <v-flex
                    xs12
                    md12
                  >
                    <v-flex
                      xs12
                      text-xs-right
                    >
                      <v-btn
                        class="mx-0 font-weight-light"
                        color="success"
                        @click="login"
                      >
                        Login
                      </v-btn>
                    </v-flex>
                </v-flex></v-layout>
              </v-container>
            </v-form>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout
      align-center
      justify-center
      wrap
    >
      <v-flex
        v-for="code in codemst"
        :key="code.CODE_CD"
        ma-2
      >
        <v-tooltip
          top
          content-class="top">
          <v-icon slot="activator">
            {{ code.CODE_CD }}
          </v-icon>
          <span>{{ code.CODE_NM }}</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
var setCookie = function (name, value, min) {
  var date = new Date()
  date.setTime(date.getTime() + min * 60 * 1000)
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/'
}

export default {
  data: () => ({
    user: { id: 'devfskl', pw: '7788' },
    userInfo: null,
    codemst: null
  }),
  methods: {
    login: async function () {
      var param = { 'approachType': 'INSIDE', 'userId': this.user.id, 'userPassword': this.user.pw, 'LANG_TYPE_CD': 'en' }
      var result = await this.$http.post(`/checkAccount.json`, param)
      if (result.data.RESULT_CD === 'VALID_ACCOUNT') {
        result = await this.$http.post(`/j_kerol_session_check.json`, param)
        this.userInfo = result.data.USER_INFO
        sessionStorage.setItem('USER_BASE_INFO_MAP', JSON.stringify(result.data.USER_INFO))
        setCookie('_S_USER_ID', this.userInfo._S_USER_ID, 1)
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>
