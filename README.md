# Raspberry Pi Sync

This Visual Studio Code extension adds the ability to sync code between a computer and a Raspberry Pi with minimal setup using rsync. This plugin was tested on VSCode v1.36.1 on Windows 7 using [Cygwin](https://cygwin.com/) for rsync (v3.0.6, protocol version 30) capability and a Raspberry Pi running Ubuntu MATE v18.04.2 LTS.

I have not tested this on mac or Linux, but it should work, though it may require slight changes in the sync and compare files. See below.

Additionally, this extension can be used for syncing other devices or locally using rsync. Or, if you must, exploited to run a Batch or Bash file by command/keyboard shortcut in VSCode.

## Features

These features are runnable via the command pallette in VSCode. Keyboard shortcuts can be specified for each command in the Keybindings settings in VSCode.

* `Run Sync` - Runs the sync. A sync is customized in a file called the sync file. By default, it will run a global file. If a workspace sync file is created, it will be run instead. Default shortcut is CTRL+ALT+S, and SHIFT+CMD+S on mac.

* `Run Sync from Global File` - Runs the global sync file regardless of if there is a workspace sync file.

**Note:** There isn't a way to send SIGTERM to the VSCode integrated terminal. If you need to stop a sync or compare running, open the terminal and hit CTRL+C.

* `Create a Workspace Sync File`

* `Edit Sync File` - If there is no workspace sync file, this will edit the global sync file. If there is a workspace sync file, it will be edited instead. Default shortcut is CTRL+ALT+E, and SHIFT+CMD+E on mac.

* `Delete Workspace Sync File` - Useful if you no longer wish to have a workspace sync file, want it to reset to what the global file contains, or only wish to run the global file from there on out.

* `Edit Global Sync File`

You can also compare the source and destination in VSCode using rsync. The results of the compare are found in the integrated terminal. The behavior of the compare files is that of the sync files regarding workspace and global files.

* `Compare Source and Destination`

* `Compare Source and Destination from Global File`

* `Create a Workspace Compare File`

* `Edit Compare File`

* `Edit Global Compare File`

* `Delete Workspace Compare File`

* `Toggle Between Batch and Bash` - This extension defaults to using Batch. If you are running Linux or macOS, you must toggle this to use Bash. The contents of the files do not carry between Batch and Bash. This applies to sync files and compare files.

Rsync has the capability to exclude certain files from syncing to the destination. To specify files to exclude, right click the file in the explorer and select `Exclude from Sync`. Rsync's exclusion capabilities can be nuanced, and, for that reason, must sometimes be manually edited.

To edit the exclusion file, run the command `Edit Exclude File`. For more information on how to edit this file, read [here](https://www.hyperorg.com/blogger/2008/05/10/beginner-to-beginner-rsync-exclude-from/) as a starter resource.

## Requirements

This extension operates under the assumption that you have rsync installed and configured correctly on both devices.

If you do not setup an RSA keypair, you will have to open the integrated terminal and sign in to your remote device every time.

On Windows, you must use Cygwin to install rsync and use cygdrive paths.

## Installation

You can [download](https://github.com/WampyCakes/RPi-Sync/releases) the latest version of the extension. To install, run `code --install-extension rpi-sync-{version}.vsix`

You can also install it from the VSCode Marketplace.

## Cygwin & Rsync Resources
[Installation, Setup, and Use](https://www.howtogeek.com/175008/the-non-beginners-guide-to-syncing-data-with-rsync/)

[RSA Keypair (for not requiring login)](https://willhaley.com/blog/backup-windows-internet-rsync-ssh-raspberry-pi/) additionally [here](https://www.thegeekstuff.com/2008/11/3-steps-to-perform-ssh-login-without-password-using-ssh-keygen-ssh-copy-id/) 

[Enabling SSH on RPi](https://www.raspberrypi.org/documentation/remote-access/ssh/README.md) - **Note:** You may have to `sudo apt-get install openssh-server`

[Rsync Flags](http://manpages.ubuntu.com/manpages/disco/en/man1/rsync.1.html)

## Known Issues

None

## Release Notes

### 1.0.1

>Edited a message in the UI

### 1.0.0

>Initial release of RPi Sync

See the changelog for complete information.
## License
This extension is licensed under AGPL-3.0. See the `LICENSE` file for more information.
