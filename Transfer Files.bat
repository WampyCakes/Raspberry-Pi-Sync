REM @echo off

set excludeFile=%1

rsync -azh --stats --progress --no-p --no-g --chmod=ugo=rwX --delete --exclude-from %excludeFile% "/cygdrive/d/Users/Admin/My Documents/SYNC/Coding/Python/Science Fair Project 2019-20" a@192.168.0.16:Project/