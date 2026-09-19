import type { Text } from '../types'
import { tx } from '../types'

export type Profession = {
  id: string
  emoji: string
  hue: string
  name: Text
}

export const PROFESSIONS: Record<string, Profession> = {
  baker: { id: 'baker', emoji: '🥖', hue: '#e8a317', name: tx('Пекарь', 'Наубайшы', 'Baker') },
  seller: { id: 'seller', emoji: '🛍️', hue: '#2a9d8f', name: tx('Продавец', 'Сатушы', 'Shopkeeper') },
  chef: { id: 'chef', emoji: '👨‍🍳', hue: '#c44536', name: tx('Повар', 'Аспаз', 'Chef') },
  doctor: { id: 'doctor', emoji: '🩺', hue: '#4cc9f0', name: tx('Врач', 'Дәрігер', 'Doctor') },
  architect: { id: 'architect', emoji: '📐', hue: '#7b6cf6', name: tx('Архитектор', 'Сәулетші', 'Architect') },
  farmer: { id: 'farmer', emoji: '🌾', hue: '#7cb342', name: tx('Фермер', 'Фермер', 'Farmer') },
  courier: { id: 'courier', emoji: '🚚', hue: '#fb8c00', name: tx('Курьер', 'Курьер', 'Courier') },
  tailor: { id: 'tailor', emoji: '🧵', hue: '#ec407a', name: tx('Портной', 'Тігінші', 'Tailor') },
  banker: { id: 'banker', emoji: '🏦', hue: '#26a69a', name: tx('Банкир', 'Банкир', 'Banker') },
  driver: { id: 'driver', emoji: '🚕', hue: '#ffca28', name: tx('Водитель', 'Жүргізуші', 'Driver') },
  vet: { id: 'vet', emoji: '🐾', hue: '#8d6e63', name: tx('Ветеринар', 'Ветеринар', 'Vet') },
  florist: { id: 'florist', emoji: '🌷', hue: '#ef6c9f', name: tx('Флорист', 'Флорист', 'Florist') },
  builder: { id: 'builder', emoji: '🧱', hue: '#ff7043', name: tx('Строитель', 'Құрылысшы', 'Builder') },
  coder: { id: 'coder', emoji: '💻', hue: '#5c6bc0', name: tx('Программист', 'Бағдарламашы', 'Programmer') },
  athlete: { id: 'athlete', emoji: '🏅', hue: '#42a5f5', name: tx('Тренер', 'Жаттықтырушы', 'Coach') },
  photo: { id: 'photo', emoji: '📷', hue: '#78909c', name: tx('Фотограф', 'Фотограф', 'Photographer') },
  sailor: { id: 'sailor', emoji: '⛵', hue: '#29b6f6', name: tx('Моряк', 'Теңізші', 'Sailor') },
  engineer: { id: 'engineer', emoji: '⚙️', hue: '#90a4ae', name: tx('Инженер', 'Инженер', 'Engineer') },
  pharma: { id: 'pharma', emoji: '💊', hue: '#66bb6a', name: tx('Фармацевт', 'Фармацевт', 'Pharmacist') },
  weather: { id: 'weather', emoji: '🌦️', hue: '#4fc3f7', name: tx('Синоптик', 'Синоптик', 'Meteorologist') },
  reporter: { id: 'reporter', emoji: '📰', hue: '#ffa726', name: tx('Журналист', 'Журналист', 'Journalist') },
  musician: { id: 'musician', emoji: '🎵', hue: '#ab47bc', name: tx('Музыкант', 'Музыкант', 'Musician') },
  scientist: { id: 'scientist', emoji: '🔬', hue: '#26c6da', name: tx('Учёный', 'Ғалым', 'Scientist') },
  logistics: { id: 'logistics', emoji: '📦', hue: '#8d6e63', name: tx('Логист', 'Логист', 'Logistician') },
  designer: { id: 'designer', emoji: '🎨', hue: '#ff8a65', name: tx('Дизайнер', 'Дизайнер', 'Designer') },
  barista: { id: 'barista', emoji: '☕', hue: '#a1887f', name: tx('Бариста', 'Бариста', 'Barista') },
  electrician: { id: 'electrician', emoji: '💡', hue: '#ffd54f', name: tx('Электрик', 'Электрик', 'Electrician') },
  pilot: { id: 'pilot', emoji: '✈️', hue: '#64b5f6', name: tx('Пилот', 'Ұшқыш', 'Pilot') },
  gamedev: { id: 'gamedev', emoji: '🎮', hue: '#7e57c2', name: tx('Геймдизайнер', 'Геймдизайнер', 'Game designer') },
  nurse: { id: 'nurse', emoji: '💉', hue: '#80cbc4', name: tx('Медсестра', 'Медбике', 'Nurse') },
  gardener: { id: 'gardener', emoji: '🌻', hue: '#9ccc65', name: tx('Садовник', 'Бағбан', 'Gardener') },
  cashier: { id: 'cashier', emoji: '💳', hue: '#26a69a', name: tx('Кассир', 'Кассир', 'Cashier') },
}

export function profession(id: string) {
  return PROFESSIONS[id] ?? PROFESSIONS.seller
}
