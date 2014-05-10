(custom-set-variables
;; custom-set-variables was added by Custom.
;; If you edit it by hand, you could mess it up, so be careful.
;; Your init file should contain only one such instance.
;; If there is more than one, they won't work right.
'(Rnw-mode-hook nil)
'(ansi-color-names-vector ["#242424" "#e5786d" "#95e454" "#cae682" "#8ac6f2" "#333366" "#ccaa8f" "#f6f3e8"])
'(custom-enabled-themes (quote (wheatgrass)))
'(setq ess-indent-level 2)
'(ess-default-style OWN)
'(ess-r-args-electric-paren t)
'(tab-width 2))

(custom-set-faces
;; custom-set-faces was added by Custom.
;; If you edit it by hand, you could mess it up, so be careful.
;; Your init file should contain only one such instance.
;; If there is more than one, they won't work right.
)


(add-to-list 'default-frame-alist '(height . 67))
(add-to-list 'default-frame-alist '(width . 81)) 
(setq-default fill-column 80)           ; Automatic width formatting with M-q
(require 'iso-transl)                   ; Allow for dead keys

;; Aspell configuration
(if (eq system-type 'darwin)
     (if (file-executable-p "/usr/local/bin/aspell")
     (progn
       (setq ispell-program-name "/usr/local/bin/aspell")
       (setq ispell-extra-args '("-d" "/Library/Application Support/cocoAspell/aspell6-en-6.0-0/en.multi"))
       )))
 
 
;; easy spell check
(global-set-key (kbd "<f8>") 'ispell-word)
(global-set-key (kbd "C-S-<f8>") 'flyspell-mode)
(global-set-key (kbd "C-M-<f8>") 'flyspell-buffer)
(global-set-key (kbd "C-<f8>") 'flyspell-check-previous-highlighted-word)

(defun flyspell-check-next-highlighted-word ()
  "Custom function to spell check next highlighted word"
  (interactive)<x
  (flyspell-goto-next-error)
  (ispell-word)
  )
 
(global-set-key (kbd "M-<f8>") 'flyspell-check-next-highlighted-word)
 
;; This is to make mac friendly
(setq mac-function-modifier 'control
      mac-command-modifier 'meta
      mac-right-command-modifier 'control
      mac-right-option-modifier 'nil
      mac-option-modifier nil
      )
 
;; (global-set-key "æ" '"{")
;; (global-set-key "§" '"[")
;; (global-set-key "‘" '"]")
;; (global-set-key "¶" '"}")
 
 
;; This is for the keyboard in temporarly
;; (global-set-key (kbd "C-<") '"\\")
;; (global-set-key (kbd "C-à") '"{")
;; (global-set-key (kbd "C-$") '"}")
;; (global-set-key (kbd "C-è") '"[")
;; (global-set-key (kbd "C-!") '"\\\{")
 
(global-set-key [S-tab] 'other-frame)
(global-set-key (kbd "C-'") 'other-frame)
(global-set-key (kbd "C-§") 'other-window)

;; Delete selection when pressing [delete] key
(delete-selection-mode t)
 
;; Set Tab on 2
(setq-default indent-tabs-mode nil)
(setq-default tab-width 2)
(setq indent-line-function 'insert-tab)
(setq python-indent-offset 4) 
(setq js-indent-level 2)

;; Autocompletion
(add-to-list 'load-path "~/.emacs.d")
(require 'auto-complete)
(define-key ac-completing-map "\t" 'ac-complete)
(define-key ac-completing-map "\r" nil)
(define-key ac-completing-map [tab] 'ac-complete)
(define-key ac-completing-map [return] nil)
  ;; This is for the autocompletion in ESS
(setq ess-use-auto-complete t)
(setq ess-use-auto-complete 'script-only)
(setq
      ac-auto-show-menu nil
      ac-candidate-limit nil
      ac-delay 0.3
      ;; ac-disable-faces (quote (font-lock-comment-face font-lock-doc-face))
      ;; ac-ignore-case 'smart
      ac-menu-height 10
      ac-quick-help-delay 1
      ac-quick-help-prefer-pos-tip t
      ac-use-quick-help t
      )
 
(setq ess-eval-visibly-p nil) ; otherwise C-c C-r (eval region) takes forever
(setq ess-ask-for-ess-directory nil) ; otherwise you are prompted each time you start an interactive R session
 
(setq ess-ask-for-ess-directory nil)
(setq ess-local-process-name "R")
(setq ansi-color-for-comint-mode 'filter)
(setq comint-prompt-read-only t)
(setq comint-scroll-to-bottom-on-input t)
(setq comint-scroll-to-bottom-on-output t)
(setq comint-move-point-for-output t)
(ess-set-style 'OWN)
 
(defun my-ess-start-R ()
  (interactive)
  (if (not (member "*R*" (mapcar (function buffer-name) (buffer-list))))
      (progn
                (delete-other-windows)
                (setq w1 (selected-window))
                (setq w1name (buffer-name))
                (setq w2 (split-window w1))
                (R)
                (set-window-buffer w2 "*R*")
                (set-window-buffer w1 w1name))))
 
(defun my-ess-eval ()
  (interactive)
  (my-ess-start-R)
  (if (and transient-mark-mode mark-active)
      (call-interactively 'ess-eval-region)
    (call-interactively 'ess-eval-line-and-step)))
 
(add-hook 'ess-mode-hook
                '(lambda()
                    (local-set-key [(shift return)] 'my-ess-eval)))
 
(add-hook 'inferior-ess-mode-hook
                '(lambda()
                    (local-set-key [C-up] 'comint-previous-input)
                    (local-set-key [C-down] 'comint-next-input)))
 
(require 'ess-site)
 
 
(require 'auto-complete-config)
;;(require 'auto-complete-acr)
(add-to-list 'ac-dictionary-directories "~/.emacs.d/ac-dict")
(ac-config-default)
;;(require 'auto-complete-latex)
;;(setq ac-l-dict-directory "~/.emacs.d/ac-dict/")
;;(add-to-list 'ac-modes 'foo-mode)
;;(add-hook 'foo-mode-hook 'ac-l-setup)
 
;; enable skeleton-pair insert globally
(setq skeleton-pair t)

;;(setq skeleton-pair-on-word t)
(global-set-key (kbd "(") 'skeleton-pair-insert-maybe)
(global-set-key (kbd "[") 'skeleton-pair-insert-maybe)
(global-set-key (kbd "{") 'skeleton-pair-insert-maybe)
(global-set-key (kbd "\"") 'skeleton-pair-insert-maybe)
(global-set-key (kbd "\'") 'skeleton-pair-insert-maybe)
 
 
;; Command for Latex
(setq TeX-auto-save t)
(setq TeX-parse-self t)
(setq TeX-save-query nil)
 
(setq TeX-PDF-mode t)
 
(add-hook 'LaTeX-mode-hook 'visual-line-mode)
(add-hook 'LaTeX-mode-hook 'flyspell-mode)
(add-hook 'LaTeX-mode-hook 'LaTeX-math-mode)
 
(add-hook 'LaTeX-mode-hook 'turn-on-reftex)
(setq reftex-plug-into-AUCTeX t)
 
(add-hook 'doc-view-mode-hook 'auto-revert-mode)

  
;; AutoComplete color
(set-face-attribute 'ac-candidate-face nil   :background "#00222c" :foreground "light gray")
(set-face-attribute 'ac-selection-face nil   :background "SteelBlue4" :foreground "white")
(set-face-attribute 'popup-tip-face    nil   :background "#003A4E" :foreground "light gray")
 
 
;; To clear the shell in R
(defun clear-shell ()
   (interactive)
   (let ((old-max comint-buffer-maximum-size))
     (setq comint-buffer-maximum-size 0)
     (comint-truncate-buffer)
     (setq comint-buffer-maximum-size old-max)))
 
 
;; To reset the size of the terminal in R in ESS use C-c w to reset the size of the console
(defun my-ess-post-run-hook ()
  (ess-execute-screen-options)
  (local-set-key "\C-cw" 'ess-execute-screen-options))
(add-hook 'ess-post-run-hook 'my-ess-post-run-hook)
 
 
;; To have snippets to accelerate programming in C++
(add-to-list 'load-path
             "~/.emacs.d/elpa/yasnippet-0.8.0")
(require 'yasnippet)
(yas-global-mode 1)
 
;; This is for python on emac
(setq
python-shell-interpreter "ipython"
python-shell-interpreter-args "--pylab"
python-shell-prompt-regexp "In \\[[0-9]+\\]: "
python-shell-prompt-output-regexp "Out\\[[0-9]+\\]: "
python-shell-completion-setup-code
   "from IPython.core.completerlib import module_completion"
python-shell-completion-module-string-code
   "';'.join(module_completion('''%s'''))\n"
python-shell-completion-string-code
   "';'.join(get_ipython().Completer.all_completions('''%s'''))\n")

  ;; For python JEDI
(add-hook 'python-mode-hook 'jedi:setup)
(setq jedi:setup-keys t)                      ; optional
(setq jedi:complete-on-dot t)                 ; optional
 
(require 'package)
(add-to-list 'package-archives
  '("melpa" . "http://melpa.milkbox.net/packages/") t)

  ;; For latex keybindings 
(eval-after-load 'latex '(latex/setup-keybinds))

  ;; For javascript in node
(setenv "NODE_NO_READLINE" "1")


;; Rmd Part
;; Rmd to Html 
(defun rmarkdown-to-html ()
  "Run knitr::knit2html on the current file"
  (interactive)
  (shell-command 
   (format "Rscript -e \"knitr::knit2html('%s')\""
     (shell-quote-argument (buffer-file-name)))))

(defun rmd-insert-chunk ()
  "Insert rchunk for .Rmd files"
  (interactive)
  (if (region-active-p)     
    (save-excursion 
      (goto-char (region-end)) (insert "\n```")
      (goto-char (region-beginning)) (insert "```{r}\n")
    ) 
    ((lambda ()
     (insert "```{r}\n\n```")
     (previous-line)
    ))
  ) 
)

(global-set-key (kbd "<C-dead-circumflex>") 'rmd-insert-chunk) ; Set shortcut to rmd-rchunk

;(latex-preview-pane-enable) ;; Allow for preview
