let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Code/vue-firebase-course/muso-ninjas
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +16 src/router/index.ts
badd +9 src/views/Home.vue
badd +7 src/App.vue
badd +7 src/assets/main.css
badd +0 src/main.ts
badd +32 src/firebase/config.js
badd +1 src/composables/getCollection.ts
badd +0 tsconfig.json
badd +57 src/composables/useSignup.ts
badd +17 src/composables/useLogout.ts
badd +9 src/composables/useLogin.ts
badd +38 src/composables/useCollection.ts
badd +5 src/composables/getUser.ts
badd +6 src/views/auth/Login.vue
badd +29 src/views/Signup.vue
badd +1 src
badd +35 src/views/auth/Signup.vue
badd +3 src/components/Navbar.vue
badd +0 output:///info
argglobal
%argdel
$argadd ~/Code/vue-firebase-course/muso-ninjas
set stal=2
edit src/composables/useSignup.ts
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 93 + 93) / 186)
exe 'vert 2resize ' . ((&columns * 92 + 93) / 186)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 4 - ((3 * winheight(0) + 38) / 76)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
4
normal! 0
lcd ~/Code/vue-firebase-course/muso-ninjas
wincmd w
argglobal
if bufexists("~/Code/vue-firebase-course/muso-ninjas/src/views/auth/Signup.vue") | buffer ~/Code/vue-firebase-course/muso-ninjas/src/views/auth/Signup.vue | else | edit ~/Code/vue-firebase-course/muso-ninjas/src/views/auth/Signup.vue | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 2 - ((1 * winheight(0) + 38) / 76)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
2
normal! 0
lcd ~/Code/vue-firebase-course/muso-ninjas
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 93 + 93) / 186)
exe 'vert 2resize ' . ((&columns * 92 + 93) / 186)
tabedit ~/Code/vue-firebase-course/muso-ninjas/src/views/auth/Login.vue
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 93 + 93) / 186)
exe 'vert 2resize ' . ((&columns * 92 + 93) / 186)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 31 - ((30 * winheight(0) + 38) / 76)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
31
normal! 020|
lcd ~/Code/vue-firebase-course/muso-ninjas
wincmd w
argglobal
if bufexists("~/Code/vue-firebase-course/muso-ninjas/src/router/index.ts") | buffer ~/Code/vue-firebase-course/muso-ninjas/src/router/index.ts | else | edit ~/Code/vue-firebase-course/muso-ninjas/src/router/index.ts | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 18 - ((17 * winheight(0) + 38) / 76)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
18
normal! 020|
lcd ~/Code/vue-firebase-course/muso-ninjas
wincmd w
exe 'vert 1resize ' . ((&columns * 93 + 93) / 186)
exe 'vert 2resize ' . ((&columns * 92 + 93) / 186)
tabedit ~/Code/vue-firebase-course/muso-ninjas/src/views/Home.vue
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 38 + 39) / 79)
exe 'vert 1resize ' . ((&columns * 93 + 93) / 186)
exe '2resize ' . ((&lines * 38 + 39) / 79)
exe 'vert 2resize ' . ((&columns * 92 + 93) / 186)
exe '3resize ' . ((&lines * 37 + 39) / 79)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 13 - ((12 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
13
normal! 023|
lcd ~/Code/vue-firebase-course/muso-ninjas
wincmd w
argglobal
if bufexists("~/Code/vue-firebase-course/muso-ninjas/src/App.vue") | buffer ~/Code/vue-firebase-course/muso-ninjas/src/App.vue | else | edit ~/Code/vue-firebase-course/muso-ninjas/src/App.vue | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 7 - ((6 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
7
normal! 0
lcd ~/Code/vue-firebase-course/muso-ninjas
wincmd w
argglobal
if bufexists("~/Code/vue-firebase-course/muso-ninjas/src/components/Navbar.vue") | buffer ~/Code/vue-firebase-course/muso-ninjas/src/components/Navbar.vue | else | edit ~/Code/vue-firebase-course/muso-ninjas/src/components/Navbar.vue | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 3 - ((2 * winheight(0) + 18) / 37)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
3
normal! 013|
lcd ~/Code/vue-firebase-course/muso-ninjas
wincmd w
exe '1resize ' . ((&lines * 38 + 39) / 79)
exe 'vert 1resize ' . ((&columns * 93 + 93) / 186)
exe '2resize ' . ((&lines * 38 + 39) / 79)
exe 'vert 2resize ' . ((&columns * 92 + 93) / 186)
exe '3resize ' . ((&lines * 37 + 39) / 79)
tabnext 1
set stal=1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
