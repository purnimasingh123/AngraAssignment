import * as React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardHeader, CardTitle, CardBody, CardActions, CardImage, CardSubtitle, Avatar, CardFooter } from '@progress/kendo-react-layout';
import Earring1 from '../../../icons/Earring1.jpeg';
import Earring2 from '../../../icons/Earring2.jpeg';
import Earring3 from '../../../icons/Earring3.jpeg';
const cardsData =
    [
        {
            thumbnailSrc: Earring1,
            headerTitle: 'Gold EarRing',
            headerSubtitle: '$4500',
            commentsExpanded: false,
            postLiked: false,
            comments: [],
            newCommentTextValue: '',
            postLikes: 100,
            scrollViewItems: { url: Earring1 }
        },
        {
            thumbnailSrc: Earring2,
            headerTitle: 'Diamond EarRing',
            headerSubtitle: '$8000',
            commentsExpanded: false,
            postLiked: false,
            comments: [],
            postLikes: 230,
            newCommentTextValue: '',
            scrollViewItems: { url: Earring2 }
        },
        {
            thumbnailSrc: Earring3,
            headerTitle: 'Perl Rose Earing',
            headerSubtitle: '$9000',
            commentsExpanded: false,
            postLiked: false,
            comments: [],
            postLikes: 120,
            newCommentTextValue: '',
            scrollViewItems: { url: Earring3 }
        }
    ]

class Earrings extends React.Component {

    state = {
        cards: cardsData,
        postLikes: 0
    }

    postLikesCount = (card, postLikes) => {
        console.log("Value of postLikes", postLikes)
        let index = this.state.cards.findIndex(item => item.thumbnailSrc === card.thumbnailSrc);
        let newCards = [...this.state.cards];
        newCards[index].postLiked = !newCards[index].postLiked;
        this.setState({ cards: newCards, postLikes: postLikes++ });
    }

    commentClick = (card) => {
        let index = this.state.cards.findIndex(item => item.thumbnailSrc === card.thumbnailSrc);
        let newCards = [...this.state.cards];
        newCards[index].commentsExpanded = !newCards[index].commentsExpanded;
        this.setState({ cards: newCards });
    }

    commentLikesCount = (comment) => {

    }

    postComment = (card) => {
        let index = this.state.cards.findIndex(item => item.thumbnailSrc === card.thumbnailSrc);
        let newCards = [...this.state.cards];
        let textArea = document.querySelector('.k-textarea');
        newCards[index].comments.push({
            likes: 0,
            text: textArea.value
        })
        textArea.value = ''
        this.setState({ cards: newCards });
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {this.state.cards.map(card => {
                    return (
                        <Card style={{ width: 260, marginLeft: 20, boxShadow: '0 0 4px 0 rgba(0, 0, 0, .1)', marginTop: '15px' }}>
                            <CardHeader className="k-hbox" style={{ background: 'transparent' }}>
                                <Avatar type='image' shape='circle'><img src={card.thumbnailSrc} alt= "earring images" style={{ width: 40, height: 40, padding: 20 }} /></Avatar>
                                <div>
                                    <CardTitle style={{ marginBottom: '4px' }}>{card.headerTitle}</CardTitle>
                                    <CardSubtitle><p>{card.headerSubtitle}</p></CardSubtitle>
                                </div>
                            </CardHeader>
                            <CardImage src={card.scrollViewItems.url} style={{ height: '185px', maxWidth: '100%' }} />
                            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <button className="k-button k-flat" onClick={() => this.postLikesCount(card, card.postLikes)}>
                                        <span className={card.postLiked ? 'k-icon k-i-heart' : 'k-icon k-i-heart-outline'} />
                                    </button>
                                    <button className="k-button k-flat" onClick={() => this.commentClick(card)}>
                                        <span className="k-icon k-i-comment" />
                                    </button>
                                    <button className="k-button k-flat"><span className="k-icon k-i-share"></span></button>
                                </div>
                                <span style={{ fontSize: '13px', alignSelf: 'center', color: '#656565' }}>{card.postLikes} likes</span>
                            </CardActions>
                            {
                                card.commentsExpanded &&
                                <CardBody>
                                    <div>
                                        <div style={{ marginBottom: '8px', padding: '0 16px' }}>
                                            {
                                                card.comments.map(comment => {
                                                    return (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div style={{ padding: '4px 0', alignItems: 'center', display: 'flex' }}>
                                                                <Avatar
                                                                    type='initials'
                                                                    shape='circle'
                                                                    style={{ color: 'white', width: 20, height: 20 }}
                                                                >
                                                                    <span>SS</span>
                                                                </Avatar>
                                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <span style={{ fontSize: '13px', fontWeight: 'bold', maxWidth: '100px', wordBreak: 'break-all' }}>{comment.text}</span>
                                                                    <span className="time">1s ago<span style={{ marginLeft: '8px' }}>{comment.likes} like</span></span>
                                                                </div>
                                                            </div>
                                                            <button className="k-button k-flat" onClick={() => this.commentLikesCount(comment)}>
                                                                <span className={comment && comment.likes > 0 ? 'k-icon k-i-heart' : 'k-icon k-i-heart-outline'} colo />
                                                            </button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="k-hbox" style={{ padding: '16px 16px 0' }}>
                                        <textarea className="k-textarea" placeholder="Comment..." style={{ resize: 'none', borderRadius: 10, padding: 5, fontSize: 10 }} />
                                        <button className="k-button k-primary k-flat" style={{ marginLeft: 10, borderRadius: 10 }} onClick={() => this.postComment(card)}>Post</button>
                                    </div>
                                </CardBody>
                            }
                            <CardFooter className="k-hbox" style={{background: 'transparent'}}>
                             <div>
                             <Button togglable={true} primary={true} onClick={() => this.forceUpdate()} ref={el => this.button = el}>
                              Add to Cart
                            </Button>
                             </div>
                            </CardFooter> 
                        </Card>
                    )
                })}
            </div>
        );
    }
}

export default Earrings;
