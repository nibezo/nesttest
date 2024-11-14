<script setup lang="ts">
import { ref } from "vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  telegram: string;
  registrationDate: string;
  avatar: string;
}
const usersData = ref<User[] | null>(null);

const fetchUsers = async () => {
  try {
    const token = String(localStorage.getItem("nuxt_token"));

    const response = await fetch("http://127.0.0.1:3000/api/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.debug("Error:", errorData);
      return;
    }
    const data: User[] = await response.json();
    usersData.value = data;
  } catch (err) {
    console.debug("Ошибка данных. Попробуйте еще раз");
  }
};

fetchUsers();
</script>

<template>
  <v-container>
    <v-row v-for="(user, index) in usersData" :key="index" class="user-row">
      <v-row cols="12" md="8" lg="6" class="user-col">
        <span class="user-id">ID: {{ user.id }}</span>
        <span class="user-name">Имя: {{ user.firstName }}</span>
        <span class="user-surname">Фамилия: {{ user.lastName }}</span>
        <span class="user-username">
          Username:
          <a
            :href="'https://t.me/' + user.telegram.substring(1)"
            target="_blank"
            class="telegram-link"
            >{{ user.telegram }}</a
          >
        </span>
        <span class="user-date"
          >Дата регистрации: {{ user.registrationDate }}</span
        >
        <div class="avatar-container">
          <img
            :src="'http://127.0.0.1:3000' + user.avatar"
            alt="User Avatar"
            class="user-avatar"
          />
        </div>
      </v-row>
    </v-row>
  </v-container>
</template>

<style scoped>
.user-row {
  margin-bottom: 35px;
}

.user-col {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.user-id,
.user-name,
.user-surname,
.user-username,
.user-date {
  display: block;
  margin-bottom: 4px;
  font-size: 16px;
  color: #333;
}

.telegram-link {
  color: #1da1f2;
  text-decoration: none;
}

.avatar-container {
  margin-top: 8px;
}

.user-avatar {
  max-width: 100px;
  border-radius: 50%;
  border: 1px solid #ddd;
}
</style>
