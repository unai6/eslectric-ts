<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import type { DateRange, EnergyCategory, EnergyType } from '@/components/ElectricBalance/interfaces'
import type { Period } from '@/components/ElectricBalance/types'

import Chart from 'primevue/chart'

import apiService from '@/services/apiService'
import config from '@/config'
import { getDefaultChartOptions } from '@/utils'

import dayjs from 'dayjs'

const state = reactive({
  isLoading : false,
})

const date = ref<DateRange>({
  start: '',
  end: '',
})

const energyData = ref<EnergyType[]>([])

const period = ref<Period>('day')

const chartData = computed(() => {
  if (!energyData.value.length) return { labels: [], datasets: [] }

  const labels = energyData.value[0]?.attributes.values.map(v => getFormattedDateByPeriod(v.datetime, period.value)) || []

  return {
    labels,
    datasets: energyData.value
      .filter(energy => energy.attributes.values?.length > 0)
      .map(energy => ({
        label: energy.attributes.title,
        data: energy.attributes.values.map(v => v.value),
        borderColor: energy.attributes.color,
        backgroundColor: energy.attributes.color + '60',
        fill: false,
        tension: 0.4
      }))
  }
})

const chartOptions = getDefaultChartOptions({
  title: 'Balance eléctrico',
  yTitle: 'Energía (MWh)',
  xTitle: 'Fecha',
  responsive: true,
  maintainAspectRatio: true,
})

function getFormattedDateByPeriod (datetime: string, period: Period): string {
  switch (period) {
  case 'day':
    return dayjs(datetime).format('DD/MM/YYYY')
  case 'month':
    return dayjs(datetime).format('MMMM YYYY')
  default:
    return dayjs(datetime).format('DD/MM/YYYY')
  }
}

function getDateRange (period: Period): DateRange {
  const defaultTimeFormat = 'YYYY-MM-DDTHH:MM'
  switch (period) {
  case 'day': {
    return {
      start: dayjs().subtract(6, 'day').format(defaultTimeFormat),
      end: dayjs().hour(24).format(defaultTimeFormat),
    }
  }
  case 'month': {
    return {
      start: dayjs().subtract(29, 'day').format(defaultTimeFormat),
      end: dayjs().hour(24).format(defaultTimeFormat),
    }
  }
  default: {
    return {
      start: dayjs().startOf('day').format(defaultTimeFormat),
      end: dayjs().hour(24).format(defaultTimeFormat),
    }
  }
  }
}

async function fetchElectricBalance(timeTrunc: Period = 'day'): Promise<void> {
  state.isLoading = true
  period.value = timeTrunc

  try {
    date.value = getDateRange(timeTrunc)

    const { data } = await apiService.get(config.reeApi.balance,
      {
        start_date: date.value.start,
        end_date: date.value.end,
        time_trunc: timeTrunc,
      },
    )

    const categories = data.included.map((category: EnergyCategory) => ({
      type: category.type,
      energyTypes: category.attributes.content.filter((energy: EnergyType) => energy.attributes?.values?.length && energy.attributes.type === 'distinct')
    }))

    // Flatten all energy types into a single array.
    energyData.value = categories.reduce((acc: EnergyType[], category: { energyTypes: never }) => [...acc, ...category.energyTypes], [])
  } catch (err) {
    console.error(' !! Could not fetch electric balance.', err)
  } finally {
    state.isLoading = false
  }
}

onMounted(async () => {
  await fetchElectricBalance('day')
})
</script>

<template>
  <div class="h-full w-full p-4">
    <div class="h-[500px]">
      <Chart
        type="bar"
        :height=400
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>
