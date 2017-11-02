<template lang="html">
  <main>
    <div class="explainer" v-if="explainer">The Under Construction Club is a bunch of half-finished ideas released too early. Find more at the site + make your own :)</div>
    <div class="topBanner"><span><a href="http://www.under-construction.club" @mouseenter="explainer = true" @mouseleave="explainer = false">The Under Construction Club</a><button @click="min = !min"><span v-if="min">+</span><span v-else>-</span></button></span></div>
    <div class="textBox" v-if="!min">
      <div v-if="state === 'text'">
        <button @click="state = 'guestbook'">Guestbook</button>
        <div v-if="config.about">
          <label>About</label>
          <p>{{config.about}}</p>
        </div>
        <div v-if="config.instructions">
          <label>Instructions</label>
          <p>{{config.instructions}}</p>
        </div>
        <div v-if="config.next">
          <label>What's Next</label>
          <p>{{config.next}}</p>
        </div>
      </div>
      <div v-if="state === 'guestbook'">
        <button @click="state = 'text'">About</button>
        <textarea v-model="newComment"></textarea>
        <button @click="post">Post</button>
        <div v-if="comments">
          <label>Suggestion Box/Guestbook</label>
          <p v-for="comment in commentsDisplay">{{comment.text}}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from '../../plugins/axios.js'

export default {
  name: 'ucc',
  props: ['config'],
  data () {
    return {
      state: 'text',
      newComment: '',
      comments: [],
      explainer: false,
      min: true
    }
  },
  methods: {
    post: function () {
      axios.post('guestbook.json', {text: this.newComment})
        .then(res => {
          this.comments.push({text: this.newComment})
          this.newComment = ''
        })
        .catch(e => {
          console.log('something broke', e)
        })
    }
  },
  computed: {
    commentsDisplay () {
      return this.$_.reverse(this.comments)
    }
  },
  mounted () {
    var vue = this
    axios.get('guestbook.json')
      .then(res => {
        vue.$_.forEach(res.data, function (value, key) {
          vue.comments.push(value)
        })
      })
  }
}
</script>

<style lang="scss" scoped>
  main {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 400px;

    label {
      margin-top: 20px;
      font-weight: 900;
    }

    .explainer {
      font-size: 10px;
    }

    .textBox {
      padding: 0px 8px;
      max-height: 200px;
      overflow: scroll;
      border-left: 2px dashed black;
      border-right: 2px dashed black;
    }

    p {
      margin-bottom: 10px;
    }

    textarea {
      display: block;
      width: 100%;
    }
  }


.topBanner {
  background: repeating-linear-gradient(-55deg,#ebb631,#ebb631 10px,#262425 0,#262425 20px);
  height: 40px;
  text-align: center;

  button {
    margin-left: 10px;
  }

  a {
    font-weight: 900;
    color: white;
    font-size: 22px;
    -webkit-text-stroke: 1px #000;
  }
}
</style>
