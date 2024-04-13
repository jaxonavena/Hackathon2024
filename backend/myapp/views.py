from django.shortcuts import render
from django.views import View
from django.views.decorators.http import require_http_methods
import requests
from django.http import HttpResponse, JsonResponse, HttpRequest
import json
import numpy as np
import pandas as pd

# Create your views here.

class Main(View):
    def __init__(self):
        pass
    
def get(self, request: HttpRequest ,**kwargs):
    try:
        
        url = "https://trueway-geocoding.p.rapidapi.com/Geocode"

        querystring = {"address":"505 Howard St, San Francisco","language":"en"}

        headers = {
            "X-RapidAPI-Key": "01836c3714msh582bac2093a6a03p19e6abjsn2b918034e4c0",
            "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)
        data = response.json()

        lat = data['results'][0]['location']['lat']
        lon = data['results'][0]['location']['lng']
        
        
        feedback = {
            'lat': lat,
            'long': lon,
        }
        # print(f"Lat: {lat}")
        # print(f"Long: {lng}")
    except AttributeError:
        pass
    
    return JsonResponse(feedback)