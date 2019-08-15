#The exclude-from is necessary for the "Exclude from Sync" feature to work.
#Stats and progress are viewable in the integrated terminal
#--no-p --no-g --chmod=ugo=rwX allows the synced files to be permissible to read on the destination device.
#To use this, edit the source (must use Cygdrive notation), destination, user, and IP (pointing to the device like a RPi)
#To read the flag, visit http://manpages.ubuntu.com/manpages/disco/en/man1/rsync.1.html
rsync -azh --stats --progress --no-p --no-g --chmod=ugo=rwX --delete --exclude-from $1 source user@IP:destination