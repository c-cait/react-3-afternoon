import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res => { 
        this.setState({
          posts: res.data
        })
        console.log(res.data)
      })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text })
    .then(res => {
      this.setState({
        posts: res.data
      })
      
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  createPost( text ) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, { text })
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    const { posts } = this.state;
    // const post = this.state.posts.map(e => {
    //   return (
    //     <Post key={e.id} />
    //   )
    // })
    //then insert {post} in the return statement below <compose />
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
          createPostFn={this.createPost}
          />
          { 
            posts.map(post => {
              return (
                <Post 
                key={post.id} 
                text={post.text} 
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
                /> 
              )
            })
          }
        </section>
      </div>
    );
  }
}

export default App;
