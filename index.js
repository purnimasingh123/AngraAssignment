import * as React from 'react';
import { AppBar, AppBarSection, AppBarSpacer, Avatar } from '@progress/kendo-react-layout';
import { Badge, BadgeContainer } from '@progress/kendo-react-indicators';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import Rings from './ring';
import Earrings from './earrings';
import './style.css';
let kendokaAvatar = 'https://www.telerik.com/kendo-react-ui-develop/images/kendoka-react.png';
//For Badge position
const alignments = {value:{vertical:'start',horizontal:'end'}}
class Titlebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSelected: 0,
            cartQuantity: 0
        };
    }
    handleTabSelect = (e) => {
        this.setState({ tabSelected: e.selected });
    }
    //Handle callback
    handleCart = () => {
        this.setState({ cartQuantity: this.state.cartQuantity+1 });
    }
    render() {
        return (
            <div>
                <AppBar selected={this.state.tabSelected} onSelect={this.handleTabSelect}>
                    <AppBarSection>
                        <button className="k-button k-button-clear">
                            <span className="k-icon k-i-menu" />
                        </button>
                    </AppBarSection>

                    <AppBarSpacer style={{ width: 4 }} />

                    <AppBarSection>
                        <h1 className="title">ANGARA</h1>
                    </AppBarSection>

                    <AppBarSpacer style={{ width: 32 }} />
                    <AppBarSpacer />

                    <AppBarSection className="actions">
                        <button className="k-button k-button-clear">
                            <BadgeContainer>
                                <span className="k-icon k-i-bell" />
                                <Badge shape="dot" size="small" position="inside" />

                            </BadgeContainer>
                        </button>
                    </AppBarSection>

                    <AppBarSection>
                        <span className="k-appbar-separator" />
                    </AppBarSection>

                    <AppBarSection>
                        <Avatar shape="circle" type="image">
                            <img src={kendokaAvatar} alt="loginicon" />
                        </Avatar>
                    </AppBarSection>
                    <AppBarSection>
                        <span className="k-appbar-separator" />
                    </AppBarSection>
                    <AppBarSection className="social-section">
                        <button>
                            {this.state.cartQuantity !== 0 ? <BadgeContainer>
                                <span class="k-icon k-i-cart"></span>
                                <Badge  align ={alignments.value} size="small" position="outside">
                            <span className="itemsize">{this.state.cartQuantity}</span>
                                </Badge>
                            </BadgeContainer> :
                                <span class="k-icon k-i-cart"></span>}
                        </button>
                        <button className="k-button k-button-clear">
                            <span className="k-icon k-i-facebook" />
                        </button>
                        <button className="k-button k-button-clear">
                            <span className="k-icon k-i-twitter" />
                        </button>
                        <button className="k-button k-button-clear">
                            <span className="k-icon k-i-pinterest" />
                        </button>
                        <button className="k-button k-button-clear">
                            <span className="k-icon k-i-google-plus" />
                        </button>
                    </AppBarSection>
                </AppBar>
                <TabStrip selected={this.state.tabSelected} onSelect={this.handleTabSelect}>
                    <TabStripTab title="RINGS" >
                        <Rings onChange={this.handleCart} />
                    </TabStripTab>
                    <TabStripTab title="EARRINGS">
                        <Earrings />
                    </TabStripTab>
                    <TabStripTab title="NECKLACE">
                        Basketball is a sport that is played by two teams of five players on a rectangular court.
                </TabStripTab>
                    <TabStripTab title="GIFTS">
                        Basketball is a sport that is played by two teams of five players on a rectangular court.
                </TabStripTab>
                </TabStrip>


            </div>
        );
    }
};

export default Titlebar;