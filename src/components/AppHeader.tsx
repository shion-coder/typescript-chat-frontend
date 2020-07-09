import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { useSettings } from 'contexts/SettingsContext';
import styled from 'styled-components';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Bold } from 'components/Text';
import ShareDialog from './ShareDialog';
import useDialogState from 'views/ChatRoom/hooks/useDialogState';
import { useAppLayout } from './AppLayout';
import Stack from './Stack';
import ShareIcon from '@material-ui/icons/Share';
import AppLogo from './AppLogo';
import ExceptOnMobile from './ExceptOnMobile';
import OnlyOnMobile from './OnlyOnMobile';

const StyledAppLogo = styled(AppLogo)`
  width: 50px;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
` as typeof Link;

const AppHeader = React.memo(function AppHeader() {
  const { settings, toggleVolume, toggleTheme } = useSettings();
  const { volume } = settings;

  const theme = useTheme();

  const isDarkTheme = theme.palette.type === 'dark';

  const { isOpen, openDialog, closeDialog } = useDialogState();

  const { canInvite } = useAppLayout();

  useEffect(() => {
    if (!canInvite) {
      closeDialog();
    }
  }, [canInvite, closeDialog]);

  return (
    <>
      <AppBar position="fixed" color="inherit" variant="outlined">
        <Toolbar>
          <TitleLink to="/">
            <Stack spacing={1} alignItems="center">
              <StyledAppLogo quality="medium" />
              <ExceptOnMobile>
                <Typography variant="h5">
                  <Bold>{process.env.REACT_APP_TITLE}</Bold>
                </Typography>
              </ExceptOnMobile>
            </Stack>
          </TitleLink>
          <Box flex={1} />
          <Stack spacing={1} alignItems="center">
            {canInvite && (
              <>
                <OnlyOnMobile>
                  <IconButton color="primary" onClick={openDialog}>
                    <ShareIcon />
                  </IconButton>
                </OnlyOnMobile>
                <ExceptOnMobile>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<ShareIcon />}
                    onClick={openDialog}
                  >
                    Invite Friends
                  </Button>
                </ExceptOnMobile>
              </>
            )}
            <IconButton onClick={toggleTheme}>
              {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton onClick={toggleVolume}>
              {volume ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <ShareDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
});

export default AppHeader;
