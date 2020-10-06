import * as React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardHeader, CardTitle, CardBody, CardActions, CardImage, CardSubtitle, Avatar, CardFooter } from '@progress/kendo-react-layout';
import { Window } from '@progress/kendo-react-dialogs';
import { Badge, BadgeContainer } from '@progress/kendo-react-indicators';
import Ring1 from '../../../icons/Ring1.jpeg';
import Ring2 from '../../../icons/Ring2.jpeg';
import Ring3 from '../../../icons/Ring3.jpeg';
import Gold14 from '../../../icons/14kwhitegold.jpeg';
import BlueBestGem from '../../../icons/BlueBestGem.jpeg';
import GoodBlueStone from '../../../icons/GoodBlueStone.jpeg';
import Plantinumgold from '../../../icons/platinum.jpeg';
import './ring.css';
const cardsData =
    [
        {
            thumbnailSrc: Ring1,
            headerTitle: 'Halo Diamond Ring',
            headerSubtitle: '$5500',
            commentsExpanded: false,
            postLiked: false,
            comments: [],
            newCommentTextValue: '',
            postLikes: 100,
            scrollViewItems: { url: Ring1 }
        },
        {
            thumbnailSrc: Ring2,
            headerTitle: 'Rose Gold Ring',
            headerSubtitle: '$4000',
            commentsExpanded: false,
            postLiked: false,
            comments: [],
            postLikes: 230,
            newCommentTextValue: '',
            scrollViewItems: { url: Ring2 }
        },
        {
            thumbnailSrc: Ring3,
            headerTitle: 'Plantinum Ring',
            headerSubtitle: '$6000',
            commentsExpanded: false,
            postLiked: false,
            comments: [],
            postLikes: 120,
            newCommentTextValue: '',
            scrollViewItems: { url: Ring3 }
        }
    ]

class Rings extends React.Component {
    surface;
    constructor(props) {
        super(props);
        this.state = {
            cards: cardsData,
            visible: true,
            imageSelected: false,
            goodgems: false,
            smallcarat: false,
            gold14k:false,
            platinum:false,
            itemQuantity:0
        };
    }
    componentDidMount() {
        this.setState({ visible: !this.state.visible });
    }
    postLikesCount = (card) => {
        let index = this.state.cards.findIndex(item => item.thumbnailSrc === card.thumbnailSrc);
        let newCards = [...this.state.cards];
        newCards[index].postLiked = !newCards[index].postLiked;
        newCards[index].postLikes = newCards[index].postLiked ? newCards[index].postLikes + 1 : newCards[index].postLikes - 1;
        // newCards[index].postLikes = newCards[index].postLikes+1;
        this.setState({ cards: newCards });
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
    //To Show selected item
    toggleDialog = () => {
        this.setState({
            visible: !this.state.visible
        });
    }
    //To add items to cart
    AddItemToCart = () =>{
        this.setState({itemQuantity:this.state.itemQuantity+1,
            visible: !this.state.visible,
            goodgems:false,
            imageSelected:false,
            bigcarat:false,
            smallcarat:false,
            gold14k:false,
            platinum:false
        });
        this.props.onChange(this.state.itemQuantity);
    }
    //To select item qualities
    onImageClicked = () => {
        this.setState({goodgems:false})
        this.setState({ imageSelected: !this.state.imageSelected })
    }
    //For enable and disable item selection
    onGoodImageClicked = () => {
        this.setState({imageSelected:false})
        this.setState({ goodgems: !this.state.goodgems })
    }
    smallCaratSelection = () => {
        this.setState({bigcarat:false})
        this.setState({ smallcarat: !this.state.smallcarat })
    }
    bigCaratSelection = () =>{
        this.setState({ smallcarat: false })
        this.setState({bigcarat:!this.state.bigcarat})
    }
    gold14kSelection = () =>{
        this.setState({gold14k:!this.state.gold14k})
        this.setState({platinum:false})
    }
    platinumkSelection = () =>{
        this.setState({gold14k:false})
        this.setState({platinum:!this.state.platinum})
    }
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {this.state.cards.map(card => {
                    return (
                        <Card style={{ width: 260, marginLeft: 20, boxShadow: '0 0 4px 0 rgba(0, 0, 0, .1)', marginTop: '15px' }}>
                            <CardHeader className="k-hbox" style={{ background: 'transparent' }}>
                                <Avatar type='image' shape='circle'><img src={card.thumbnailSrc} alt="ring images" style={{ width: 40, height: 40, padding: 20 }} /></Avatar>
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
                            <CardFooter className="k-hbox" style={{ background: 'transparent' }}>
                                <div>
                                    <Button primary={true} onClick={() => this.toggleDialog()} ref={el => this.button = el}>
                                        Add to Cart
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>

                    )
                })}
                {this.state.visible &&
                    <Window title={"Select Item Details"} onClose={this.toggleDialog} initialHeight={350}>
                        <form className="k-form">
                            <fieldset>
                                <legend>Item Details</legend>
                                <label className="k-form-field">
                                    <span>Gemstone Quality Selection</span>
                                    <div className="k-hbox">
                                        <BadgeContainer>
                                            <Avatar shape="circle" type="image">
                                                <img src={BlueBestGem} alt="trial gem" onClick={() => this.onImageClicked()} />
                                            </Avatar>
                                            <Badge size="small" align={{ vertical: 'bottom', horizontal: 'end' }} themeColor="success" cutoutBorder={true}>
                                                {this.state.imageSelected ? <span className="k-icon k-i-check"></span> : <span className="k-icon k-i-uncheck"></span>}
                                            </Badge>
                                        </BadgeContainer >
                                        <div className="contact-info">
                                            <h5>Gemstone Quality:Best</h5>
                                        </div>
                                    </div>
                                    <div className="k-hbox">
                                        <BadgeContainer>
                                            <Avatar shape="circle" type="image" className="GoodGemImg">
                                                <img src={GoodBlueStone} alt="trial gem" onClick={() => this.onGoodImageClicked()} />
                                            </Avatar>
                                            <Badge size="small" align={{ vertical: 'bottom', horizontal: 'end' }} themeColor="success" cutoutBorder={true}>
                                                {this.state.goodgems ? <span className="k-icon k-i-check"></span> : <span className="k-icon k-i-uncheck"></span>}
                                            </Badge>
                                        </BadgeContainer >
                                        <div className="contact-info">
                                            <h5>Gemstone Quality:Good</h5>
                                        </div>
                                    </div>
                                </label>
                                <label className="k-form-field">
                                    <span>Total Carat Weight Selection</span>
                                    <div className="k-hbox">
                                        <BadgeContainer>
                                            <Avatar shape="circle" type="image">
                                                <img src={Ring1} alt="trial gem" onClick={() => this.smallCaratSelection()} />
                                            </Avatar>
                                            <Badge size="small" align={{ vertical: 'bottom', horizontal: 'end' }} themeColor="success" cutoutBorder={true}>
                                                {this.state.smallcarat ? <span className="k-icon k-i-check"></span> : <span className="k-icon k-i-uncheck"></span>}
                                            </Badge>
                                        </BadgeContainer >
                                        <div className="contact-info">
                                            <h5>0.8 Carat</h5>
                                        </div>
                                    </div>
                                    <div className="k-hbox">
                                        <BadgeContainer>
                                            <Avatar shape="rounded" type="image">
                                                <img src={Ring1} alt="trial gem" onClick={() => this.bigCaratSelection()} />
                                            </Avatar>
                                            <Badge size="small" align={{ vertical: 'bottom', horizontal: 'end' }} themeColor="success" cutoutBorder={true}>
                                                {this.state.bigcarat ? <span className="k-icon k-i-check"></span> : <span className="k-icon k-i-uncheck"></span>}
                                            </Badge>
                                        </BadgeContainer >
                                        <div className="contact-info">
                                            <h5>2.8 Carat</h5>
                                        </div>
                                    </div>
                                </label>
                                <label className="k-form-field">
                                    <span>Metal Type Selection</span>
                                    <div className="k-hbox">
                                        <BadgeContainer>
                                            <Avatar shape="rounded" type="image">
                                                <img src={Gold14} alt="trial gem" onClick={() => this.gold14kSelection()} />
                                            </Avatar>
                                            <Badge size="small" align={{ vertical: 'bottom', horizontal: 'end' }} themeColor="success" cutoutBorder={true}>
                                                {this.state.gold14k ? <span className="k-icon k-i-check"></span> : <span className="k-icon k-i-uncheck"></span>}
                                            </Badge>
                                        </BadgeContainer >
                                        <div className="contact-info">
                                            <h5>14k white gold</h5>
                                        </div>
                                    </div>
                                    <div className="k-hbox">
                                        <BadgeContainer>
                                            <Avatar shape="rounded" type="image">
                                                <img src={Plantinumgold} alt="trial gem" onClick={() => this.platinumkSelection()} />
                                            </Avatar>
                                            <Badge size="small" align={{ vertical: 'bottom', horizontal: 'end' }} themeColor="success" cutoutBorder={true}>
                                                {this.state.platinum ? <span className="k-icon k-i-check"></span> : <span className="k-icon k-i-uncheck"></span>}
                                            </Badge>
                                        </BadgeContainer >
                                        <div className="contact-info">
                                            <h5>Platinum</h5>
                                        </div>
                                    </div>
                                </label>
                            </fieldset>

                            <div className="text-right">
                                <button type="button" className="k-button" onClick={this.toggleDialog}>Cancel</button>
                                <button type="button" className="k-button k-primary" onClick={this.AddItemToCart}>Submit</button>
                            </div>
                        </form>
                    </Window>}
            </div>
        );
    }
}

export default Rings;
