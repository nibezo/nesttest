<script setup lang="ts">
/*Call Components*/
import SalesOverview from "@/components/dashboard/SalesOverview.vue";
import YearlyBreakup from "@/components/dashboard/YearlyBreakup.vue";
import MonthlyEarning from "@/components/dashboard/MonthlyEarnings.vue";
import RecentTransaction from "@/components/dashboard/RecentTransaction.vue";
import ProductPerformance from "@/components/dashboard/ProductPerformance.vue";
import ProductCards from "@/components/dashboard/ProductCards.vue";
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Sales overview -->
        <v-col cols="12" lg="8">
          <SalesOverview />
        </v-col>
        <!-- Yearly Breakup / Monthly Earnings -->
      </v-row>
    </v-col>
    <v-col class="text-center mt-2"> </v-col>
  </v-row>
</template>
