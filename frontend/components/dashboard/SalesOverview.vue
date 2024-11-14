<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;

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
const registrationsByDate = ref<{ date: string; count: number }[]>([]);

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
      window.location.href = "/auth/login";
      return;
    }

    const data: User[] = await response.json();
    usersData.value = data;

    const dateCount: { [key: string]: number } = {};
    const result = [];

    for (let i = 0; i < data.length; i++) {
      const registrationDate = data[i].registrationDate;
      if (dateCount[registrationDate]) {
        dateCount[registrationDate] += 1;
      } else {
        dateCount[registrationDate] = 1;
      }
    }

    for (const date in dateCount) {
      result.push({
        date: date,
        count: dateCount[date],
      });
    }

    registrationsByDate.value = result;
  } catch (err) {
    console.debug("Ошибка данных. Попробуйте еще раз");
    window.location.href = "/auth/login";
  }
};

fetchUsers();

const chartOptions = computed(() => {
  return {
    series: [
      {
        name: "Registrations",
        data: registrationsByDate.value.map((item) => item.count),
      },
    ],
    chartOptions: {
      grid: {
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 3,
        xaxis: {
          lines: { show: false },
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "35%", borderRadius: [8] },
      },
      colors: [primary, secondary],
      chart: {
        type: "bar",
        height: 370,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: "#adb0bb",
        fontFamily: "inherit",
        sparkline: { enabled: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: "category",
        categories: registrationsByDate.value.map((item) => item.date),
        labels: {
          style: { cssClass: "grey--text lighten-2--text fill-color" },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        labels: {
          style: { cssClass: "grey--text lighten-2--text fill-color" },
          formatter: (val: number) => Math.floor(val).toString(),
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: "butt",
        colors: ["transparent"],
      },
      tooltip: { theme: "light" },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: { borderRadius: 3 },
            },
          },
        },
      ],
    },
  };
});
</script>

<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between pt-sm-2">
        <div>
          <v-card-title class="text-h5">Статистика регистраций</v-card-title>
        </div>
      </div>
      <div class="mt-6">
        <apexchart
          type="bar"
          height="370px"
          :options="chartOptions.chartOptions"
          :series="chartOptions.series"
        />
      </div>
    </v-card-item>
  </v-card>
</template>
