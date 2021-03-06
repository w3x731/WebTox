import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';
import ForwardIcon from '@material-ui/icons/Forward';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Avatar from '../Avatar/Avatar';

const styles = theme => ({
	toolbar: {
		minHeight: 10 * theme.spacing.unit
	},

	button: {
		padding: theme.spacing.unit
	},

	avatar: {
		paddingLeft: theme.spacing.unit
	},

	inheritWidth: {
		width: "inherit",
	},

	zeroMinWidth: {
		minWidth: 0,
	}
});

const ChatHeader = (props) => {
	const {
		active,
		avatar,
		title,
		subheader,
		menuAnchor,
		onEvent,
		classes
	} = props;

	return (
		<React.Fragment>
			<Toolbar
				disableGutters
				className={classes.toolbar}
			>
				<ListItem>
					<IconButton
						color="inherit" 
						aria-label="Drawer"
						onClick={() => onEvent({action: "DRAWER"})}
						classes={{
							root: classes.button
						}}
					>
						<MenuIcon />
					</IconButton>

					<div className={classes.avatar}>
						<Avatar	{...avatar} />
					</div>

					<ListItemText
						primary={
							<Typography
								variant="headline"
								noWrap
							>
								{title}
							</Typography>
						}
						secondary={
							<Typography
								variant="body1"
								noWrap
							>
								{subheader}
							</Typography>
						}
					/>

					{
						active ? (
							<React.Fragment>
								<Hidden 
									implementation="css"
									smDown
								>
									<IconButton
										color="inherit"
										aria-label="Delete"
										onClick={() => onEvent({action: "DELETE"})}
										classes={{
											root: classes.button
										}}
									>
										<DeleteIcon />
									</IconButton>
									<IconButton
										color="inherit"
										aria-label="Reply"
										onClick={() => onEvent({action: "REPLY"})}
										classes={{
											root: classes.button
										}}
									>
										<ReplyIcon />
									</IconButton>
									<IconButton
										color="inherit"
										aria-label="Forward"
										onClick={() => onEvent({action: "FORWARD"})}
										classes={{
											root: classes.button
										}}
									>
										<ForwardIcon />
									</IconButton>
								</Hidden>
								<Hidden 
									implementation="css"
									mdUp
								>
									<IconButton
										color="inherit"
										aria-label="Actions"
										onClick={(e) => onEvent({action: "EXPAND", payload: {target: e.currentTarget}})}
									>
										<MoreVertIcon />
									</IconButton>
									<Menu
										anchorEl={menuAnchor}
										open={Boolean(menuAnchor)}
										onClose={() => onEvent({action: "COLLAPSE"})}
									>
										<MenuItem onClick={() => onEvent({action: "DELETE"})}>Delete</MenuItem>
										<MenuItem onClick={() => onEvent({action: "REPLY"})}>Reply</MenuItem>
										<MenuItem onClick={() => onEvent({action: "FORWARD"})}>Forward</MenuItem>
									</Menu>
								</Hidden>
							</React.Fragment>
						) : null
					}
				</ListItem>
			</Toolbar>
		</React.Fragment>
	);
}

ChatHeader.propTypes = {
	avatar: PropTypes.object,
	active: PropTypes.bool.isRequired,
	onEvent: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	subheader: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
};

ChatHeader.defaultProps = {
	avatar: null,
	active: false,
	onEvent: (e) => {},
	title: "Default",
	subheader: "Default",
}

export default withStyles(styles, { withTheme: true })(ChatHeader);