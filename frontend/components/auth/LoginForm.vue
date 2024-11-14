<script setup lang="ts">
import { ref } from "vue";

const login = ref("");
const password = ref("");
const error = ref<string | null>(null);

const handleSubmit = async () => {
  try {
    error.value = null;

    const response = await fetch("http://127.0.0.1:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      error.value = errorData.message || "Ошибка";
      return;
    }

    const data = await response.json();
    const token = data.token;
    localStorage.setItem("nuxt_token", token);
    window.location.href = "/";
  } catch (err) {
    error.value = "Ошибка данных. Попробуйте еще раз";
  }
};
</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Логин</v-label>
      <v-text-field
        v-model="login"
        variant="outlined"
        hide-details
        color="primary"
        required
      ></v-text-field>
    </v-col>

    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Пароль</v-label>
      <v-text-field
        v-model="password"
        variant="outlined"
        type="password"
        hide-details
        color="primary"
        required
      ></v-text-field>
    </v-col>
    <v-col cols="12" v-if="error">
      <p class="error-message">{{ error }}</p>
    </v-col>

    <v-col cols="12" class="pt-0">
      <v-btn @click="handleSubmit" color="primary" size="large" block flat>
        Войти
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
</style>
