from rest_framework import routers

from support.views import TicketViewSet


router = routers.DefaultRouter()
router.register('tickets', TicketViewSet, basename='tickets')

urlpatterns = []
urlpatterns += router.urls
