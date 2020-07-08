<template>
  <q-page class="fullPage bg-secondary no-border text-white  ">
    <div
      class="rounded bg-animation text-secondary row items-center justify-center"
      style="height: 25vh"
    >
      <q-btn
        round
        flat
        class="anima-all-1s-ease no-pointer-events shadow-10 bg-secondary text-white q-ma-md  text-weight-light text-h4"
        :icon="iconState"
        :ripple="false"
      />
    </div>
    <!-- <div style="overflow:hidden;">
      <q-img class="headerimageses" src="https://via.placeholder.com/150" />
    </div> -->
    <q-tab-panels
      keep-alive
      v-model="tabState"
      animated
      class="bg-secondary no-border text-white"
    >
      <q-tab-panel style="overflow: hidden;" name="signin">
        <div class="text-h4 text-accent text-center">
          SignIn
        </div>
        <q-form @submit="SignIn()">
          <q-input
            class="q-my-md text-white"
            standout="bg-accent text-black"
            v-model="signIn.usermail"
            type="email"
            autocapitalize="off"
            dark
            label="Email"
          />
          <q-input
            class="q-my-md text-white"
            standout="bg-accent text-black"
            v-model="signIn.password"
            dark
            type="password"
            label="Passwort"
          />
          <q-btn
            no-caps
            class=" full-width q-mt-md bg-accent text-secondary"
            size="lg"
            :disable="!CheckSignIn()"
            label="SignIn"
            type="submit"
          />

          <q-btn
            flat
            class="full-width q-mt-md text-white"
            size="md"
            @click="tabState = 'signup'"
            label="Ich bin neu hier"
          />
        </q-form>
      </q-tab-panel>
      <q-tab-panel name="signup" style="overflow: hidden;">
        <div class="text-h4 text-accent text-center ">
          SignUp
        </div>
        <q-form @submit="SignUpPre()">
          <q-input
            class="q-my-md text-white"
            standout="bg-accent text-black"
            v-model="signUp.usermail"
            type="email"
            dark
            label="Email"
          />
          <q-input
            class="q-my-md text-white"
            standout="bg-accent text-black"
            v-model="signUp.username"
            type="text"
            dark
            label="Name"
          />
          <q-input
            class="q-my-md text-white"
            standout="bg-accent text-black"
            v-model="signUp.password1"
            dark
            type="password"
            label="Passwort"
          />
          <q-input
            class="q-my-md text-white"
            standout="bg-accent text-black"
            v-model="signUp.password2"
            dark
            type="password"
            label="Passwort wiederholen"
          />
          <q-btn
            no-caps
            class=" full-width q-mt-md bg-accent text-secondary"
            size="lg"
            :disable="!CheckSignUp()"
            label="SignUp"
            type="submit"
          />

          <q-btn
            flat
            class="full-width q-mt-md text-white"
            size="md"
            @click="tabState = 'signin'"
            label="Ich habe schon ein Account"
          />
        </q-form>
      </q-tab-panel>
      <q-tab-panel name="agbs">
        <div class="text-h4 text-accent text-center q-mt-md">Sicherheit</div>
        <p class="q-mt-md text-body1">
          Durch die Anmeldung und Nutzung von Epicllet bin ich mit den
          <span class="text-accent text-weight-bold">AGB's</span> und
          <span class="text-accent text-weight-bold">Datenschutz</span>
          einverstanden.
        </p>
        <q-checkbox
          dark
          class="full-width"
          color="amber-13"
          v-model="checkAgbs"
          label="AGBs hab ich gelesen"
        />
        <q-checkbox
          dark
          class="full-width"
          color="amber-13"
          v-model="checkDatenschutz"
          label="Datenschutz versteh ich auch"
        />
        <q-separator class="q-my-md" color="accent" />
        <q-checkbox
          dark
          class="full-width"
          color="amber-13"
          v-model="signUp.checkNewsletter"
          label="Sende mir Nachrichten für coole News"
        />
        <q-btn
          no-caps
          class=" full-width q-mt-md bg-accent text-secondary"
          size="lg"
          @click="SignUp()"
          :disable="!checkAgbs || !checkDatenschutz"
          label="Okay, alles klar."
        />
        <q-btn
          flat
          class="full-width q-mt-md text-white"
          size="md"
          @click="tabState = 'signup'"
          label="Nein doch nicht."
        />
      </q-tab-panel>
      <q-tab-panel name="error">
        <div class="text-h6">ups ein error</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export default {
  // name: 'PageName',
  // preFetch({ store, redirect }) {
  //   store.state.$auth.onAuthStateChanged(user => {
  //     if (user) redirect("/dashboard");
  //   });
  // },
  data() {
    return {
      iconState: "person", //mdi-login für login process; person für register
      tabState: "signin",
      checkAgbs: false,
      checkDatenschutz: false,
      signIn: {
        usermail: "",
        password: ""
      },
      signUp: {
        usermail: "",
        name: "",
        password1: "",
        password2: "",
        checkNewsletter: false
      }
    };
  },
  computed: {},
  methods: {
    CheckSignIn() {
      // fehlercodes = auth/wrong-password = pw falsch
      // auth/too-many-requests = zu viele login versuche
      if (this.signIn.usermail === "") return false;
      if (!validateEmail(this.signIn.usermail)) return false;
      if (this.signIn.password === "") return false;
      return true;
    },
    CheckSignUp() {
      if (this.signUp.usermail === "") return false;
      if (!validateEmail(this.signUp.usermail)) return false;
      if (this.signUp.username === "") return false;
      if (this.signUp.password1 === "") return false;
      if (this.signUp.password2 === "") return false;
      if (this.signUp.password2 !== this.signUp.password1) return false;
      return true;
    },
    SignUpPre() {
      this.tabState = "agbs";
    },
    // async SaveAccount() {
    //   return this.$store.state.core.
    // },
    // async SaveProfil(uid) {
    //   console.log("SVEPROFIL", uid);
    //   this.$store.dispatch("SaveUserProfil", {
    //     username: this.signUp.name,
    //     usermail: this.signUp.mail,
    //     newsletter: this.signUp.checkNewsletter,
    //     uid
    //   });
    //   console.log("meh");
    // },
    async SignUp() {
      console.log("Starte SignUp");
      await this.$store
        .dispatch("UserSignUp", {
          usermail: this.signUp.usermail,
          password: this.signUp.password1
        })
        .then(uid => {
          if (!uid) {
            return false;
          }
          this.$store.dispatch("SaveUserProfil", {
            username: this.signUp.username,
            usermail: this.signUp.usermail,
            newsletter: this.signUp.checkNewsletter,
            uid
          });
        });
    },
    async SignIn() {
      console.log("Starte SignIn");

      this.$store.dispatch("UserSignIn", {
        usermail: this.signIn.usermail,
        password: this.signIn.password
      });
    }
  }
};
</script>
