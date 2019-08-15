#The exclude-from is necessary for the "Exclude from Sync" feature to work.
#Comparison results are found in the integrated terminal
#To use this, edit the source (must use Cygdrive notation), destination, user, and IP (pointing to the device like a RPi)
#To read the flag, visit http://manpages.ubuntu.com/manpages/disco/en/man1/rsync.1.html
rsync -azhrc --stats --progress --delete --exclude-from $1 source user@IP:destination