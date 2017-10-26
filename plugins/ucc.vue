<template>
	<main id="uccBox">
    <div class="topBanner">
      <p>The Under Construction Club</p>
      <button @click="min = !min">-</button>
    </div>
		<div v-if="!min">
      <button v-if="state !== 'comment'" @click="state = 'comment'">Guest Book</button>
      <button v-if="state !== 'about'" @click="state = 'about'">About</button>
      <div v-if="state === 'about'">
  			<h4>What Is This?</h4>
        <p>{{config.about}}</p>
        <h4>How Do I Use It</h4>
        <p>{{config.instructions}}</p>
        <h4>What's Next?</h4>
        <p>{{config.next}}</p>
      </div>
      <div v-if="state === 'comment'">
        <h4>Guest Book</h4>
        <label>Say hi</label>
        <input type="textarea" v-model="newComment"></input>
        <button @click="postComment">Post</button>
        <hr>
        <p v-for="comment in comments">{{comment.text}}</p>
      </div>
		</div>
	</main>
</template>

<script>
import axios from './axios.js'

export default {
	data () {
		return {
			config: {},
			min: false,
      state: 'about',
      newComment: '',
      comments: []
		}
	},
  methods: {
    postComment: function () {
      axios.post('guestbook.json', {text: this.newComment})
        .then(res => {
          console.log('comment saved', res)
          this.newComment = ''
        })
        .catch(e => {
          console.log('something broke', e)
        })
    }
  },
	mounted () {
		console.log('Sup, nerd!')
    axios.get('guestbook.json')
      .then(res => {
        this.comments = res.data
      })
	}
}
</script>

<style lang="css" scoped>
#uccBox {
  width: 400px;
  max-height: 250px;
	position: absolute;
	bottom: 0;
  right: 0;
  overflow: scroll;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}

.topBanner {
  text-align: center;
  font-size: 22px;
  color: white;
   -webkit-text-stroke: 1px #000;
  background: repeating-linear-gradient(-55deg,#ebb631,#ebb631 10px,#262425 0,#262425 20px);
  font-weight: 900;
}
</style>
