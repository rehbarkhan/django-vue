.PHONY: web
web:
	python manage.py runserver 0.0.0.0:8080

.PHONY: ui
ui:
	cd templates && npm run dev -- --host