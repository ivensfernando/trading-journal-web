# Makefile
SHELL := /bin/bash
REMOTE ?= origin

.PHONY: updateGit
updateGit:
	@set -euo pipefail; \
	BRANCH="$$(git rev-parse --abbrev-ref HEAD)"; \
	if [ "$$BRANCH" = "HEAD" ]; then \
		echo "❌ Você está em detached HEAD. Troque para uma branch primeiro."; exit 1; \
	fi; \
	echo "➡️  Atualizando '$$BRANCH' a partir de '$(REMOTE)'..."; \
	git fetch "$(REMOTE)"; \
	BACKUP_REF="backup/$$BRANCH-$$(date +%Y%m%d-%H%M%S)"; \
	echo "💾 Criando backup em '$$BACKUP_REF'"; \
	git branch "$$BACKUP_REF"; \
	echo "📦 Guardando alterações locais (inclui untracked) em stash"; \
	git stash push --include-untracked -m "pre-updateGit $$BACKUP_REF" >/dev/null || true; \
	echo "🔁 Resetando para '$(REMOTE)/$$BRANCH' (hard)"; \
	git reset --hard "$(REMOTE)/$$BRANCH"; \
	echo "✅ Pronto! Workspace agora igual ao servidor."

# (Opcional) sem backup/stash:
.PHONY: updateGitNoBackup
updateGitNoBackup:
	@set -euo pipefail; \
	BRANCH="$$(git rev-parse --abbrev-ref HEAD)"; \
	test "$$BRANCH" != "HEAD"; \
	git fetch "$(REMOTE)"; \
	git reset --hard "$(REMOTE)/$$BRANCH"; \
	echo "✅ Reset hard feito para $(REMOTE)/$$BRANCH."


.PHONY: restoreGit
restoreGit:
	@set -euo pipefail; \
	echo "🔍 Buscando backups disponíveis..."; \
	git branch --list "backup/*" || true; \
	echo ""; \
	read -p "Digite o nome da branch de backup que deseja restaurar (ou deixe em branco para pular): " BACKUP; \
	if [ -n "$$BACKUP" ]; then \
		echo "🔁 Restaurando branch de backup '$$BACKUP'..."; \
		git switch "$$BACKUP"; \
	else \
		echo "⏭️  Pulando restauração de branch."; \
	fi; \
	echo ""; \
	echo "📦 Stashes disponíveis:"; \
	git stash list | grep pre-updateGit || echo "Nenhum stash encontrado."; \
	read -p "Digite o índice do stash que deseja aplicar (ex: stash@{0}), ou deixe em branco para pular: " STASH; \
	if [ -n "$$STASH" ]; then \
		echo "🔄 Aplicando $$STASH..."; \
		git stash apply "$$STASH"; \
	else \
		echo "⏭️  Nenhum stash aplicado."; \
	fi; \
	echo "✅ Restauração concluída."


.PHONY: cleanBackups
cleanBackups:
	@set -euo pipefail; \
	echo "🧹 Removendo branches de backup..."; \
	BRANCHES=$$(git branch --list "backup/*" | tr -d ' *' || true); \
	if [ -n "$$BRANCHES" ]; then \
		echo "$$BRANCHES" | xargs -r -n1 git branch -D; \
	else \
		echo "Nenhuma branch 'backup/*' encontrada."; \
	fi; \
	echo "🧹 Removendo stashes pre-updateGit..."; \
	STASHES=$$(git stash list --format="%gd %gs" | grep "pre-updateGit" | awk '{print $$1}' || true); \
	if [ -n "$$STASHES" ]; then \
		echo "$$STASHES" | while read -r ref; do git stash drop "$$ref"; done; \
	else \
		echo "Nenhum stash 'pre-updateGit' encontrado."; \
	fi; \
	echo "✅ Limpeza concluída."

.PHONY: commitGit
commitGit:
	@set -euo pipefail; \
	BRANCH="$$(git rev-parse --abbrev-ref HEAD)"; \
	if [ "$$BRANCH" = "HEAD" ]; then echo "❌ Detached HEAD. Troque para uma branch."; exit 1; fi; \
	echo "➕ Staging de todas as alterações (add/modify/delete/rename)"; \
	git add -A; \
	if git diff --cached --quiet; then echo "ℹ️  Nada para commitar."; exit 0; fi; \
	ADDED="$$(git diff --cached --name-only --diff-filter=A | sort || true)"; \
	MODIFIED="$$(git diff --cached --name-only --diff-filter=M | sort || true)"; \
	DELETED="$$(git diff --cached --name-only --diff-filter=D | sort || true)"; \
	RENAMED="$$(git diff --cached --name-status --diff-filter=R | awk '{print $$2 " -> " $$3}' | sort || true)"; \
	TMP_MSG="$$(mktemp)"; \
	cat > "$$TMP_MSG" <<MSG; \
$${MSG_PREFIX:-chore}: sync workspace

$${ADDED:+Added:}
$${ADDED:+$$(echo "$$ADDED" | sed 's/^/  - /')}

$${MODIFIED:+Modified:}
$${MODIFIED:+$$(echo "$$MODIFIED" | sed 's/^/  - /')}

$${DELETED:+Deleted:}
$${DELETED:+$$(echo "$$DELETED" | sed 's/^/  - /')}

$${RENAMED:+Renamed:}
$${RENAMED:+$$(echo "$$RENAMED" | sed 's/^/  - /')}

Branch: $$BRANCH  Remote: $(REMOTE)
Date: $$(date -u +'%Y-%m-%dT%H:%M:%SZ')
MSG
	echo "📝 Commit message:"; echo "-----------------"; cat "$$TMP_MSG"; echo "-----------------"; \
	git commit -F "$$TMP_MSG"; \
	rm -f "$$TMP_MSG"; \
	if git rev-parse --abbrev-ref "@{u}" >/dev/null 2>&1; then \
		echo "📤 Push para upstream existente..."; git push; \
	else \
		echo "📤 Definindo upstream e push..."; git push -u "$(REMOTE)" "$$BRANCH"; \
	fi; \
	echo "✅ Commit + push concluídos."
