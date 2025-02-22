export interface DateRange {
  start: string
  end: string
}

export interface EnergyValue {
  value: number
  percentage: number
  datetime: string
}

export interface EnergyType {
  type: string
  id: string
  attributes: {
    type: string,
    title: string
    color: string
    values: EnergyValue[]
  }
}

export interface EnergyCategory {
  type: string
  id: string
  groupId: string
  attributes: {
    content: EnergyType[]
    title: string
    description: string
  }
}
