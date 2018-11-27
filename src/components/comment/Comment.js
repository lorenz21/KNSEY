import React, { Component } from 'react'
import { createComment, getComments } from '../../store/actions/commentActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Comment extends Component {

  state = {
     content: ''
  }

  componentDidMount () {
   const { city } = this.props;
   this.props.getComments(city.cityId)
  }
  
  handleChange = (e) => {
     this.setState({
        [e.target.id]: e.target.value
     })
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.createComment(this.state)
      this.setState({
         content: ''
      })
  }

  render() {
    const { comment, auth } = this.props
    return (
      <div>
        <h1>Comments</h1>
        {auth.uid ? 
         <form onSubmit={this.handleSubmit}>
            <div className="input-field">
               <textarea name="content" id="content" onChange={this.handleChange} value={this.state.content} rows="4" cols="50"></textarea>
               <label htmlFor="content">Add a comment...</label>
            </div>
            <div className="input-field">
               <button className="btn">Post</button>
            </div>
         </form>
        : 
        <span>Sign in to leave a comment...</span>
        }

        <div>

            {comment.comments ?
               comment.comments.map(comment => {
                     return(
                     <ul key={comment.id} className="collection">
                        <li className='collection-item'>{comment.content}</li>
                        <li className='collection-item'>Posted by: {comment.userFirstName}, {comment.userFirstName[0]}</li>
                     </ul>
                     )
               })
            :
            null
            }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
   console.log("Comment State", state)
   return {
     auth : state.firebase.auth,
     comment: state.comment,
     city: state.city,
     profile: state.firebase.profile
   }
 }
 
 const mapDispatchToProps = (dispatch) => {
    return {
      ...bindActionCreators({ createComment, getComments }, dispatch)
    }
 }
 

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
