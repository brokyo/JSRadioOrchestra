import Vue from 'vue'
import axios from 'axios'

export default axios.create({
  baseURL: 'https://jsradioorchestra.firebaseio.com/'
})

