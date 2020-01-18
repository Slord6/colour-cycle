var scenes = [
	{
	  name: 'V08AM',
	  title: 'Jungle Waterfall - Morning - Clear',
	  sound: 'V08',
	  maxVolume: 0.25,
	  time: 'Morning',
	  weather: 'Clear',
	  tempMin: 15,
	  tempMax: 50
	},
	{
	  name: 'V08RAIN',
	  title: 'Jungle Waterfall - Day - Rain',
	  sound: 'V08RAIN',
	  time: 'Day',
	  weather: 'Rain',
	  tempMin: 10,
	  tempMax: 15
	},
	{
	  name: 'V08',
	  title: 'Jungle Waterfall - Afternoon - Clear',
	  sound: 'V08',
	  maxVolume: 0.25,
	  time: 'Afternoon',
	  weather: 'Clear',
	  tempMin: 8,
	  tempMax: 13
	},
	{
	  name: 'V08PM',
	  title: 'Jungle Waterfall - Night - Clear',
	  sound: 'V08',
	  maxVolume: 0.25,
	  time: 'Night',
	  weather: 'Clear',
	  tempMin: 5,
	  tempMax: 25
	},
	{
	  name: 'V29',
	  title: 'Seascape - Day - Clear',
	  sound: 'V29',
	  time: 'Day',
	  weather: 'Clear',
	  tempMin: 8,
	  tempMax: 40
	},
	{
	  name: 'V29FOG',
	  title: 'Seascape - Day - Fog',
	  sound: 'V29',
	  time: 'Day',
	  weather: 'Fog',
	  tempMin: 1,
	  tempMax: 8
	},
	{
	  name: 'V29PM',
	  title: 'Seascape - Evening - Clear',
	  sound: 'V29',
	  time: 'Evening',
	  weather: 'Clear',
	  tempMin: 5,
	  tempMax: 20
	},
	{
	  name: 'V19',
	  title: 'Mountain Stream - Morning - Clear',
	  sound: 'V19',
	  time: 'Morning',
	  weather: 'Clear',
	  tempMin: -10,
	  tempMax: 7
	},
	{
	  name: 'V19PM',
	  title: 'Mountain Stream - Afternoon - Clear',
	  sound: 'V19',
	  time: 'Afternoon',
	  weather: 'Clear',
	  tempMin: -10,
	  tempMax: 5
	},
	{
	  name: 'V19AURA',
	  title: 'Mountain Stream - Night - Clear',
	  sound: 'V19',
	  time: 'Night',
	  weather: 'Clear',
	  tempMin: -15,
	  tempMax: 5
	},
	{
	  name: 'V26SNOW',
	  title: 'Winter Forest - Morning - Snow',
	  sound: 'V05RAIN',
	  maxVolume: 0.25,
	  time: 'Morning',
	  weather: 'Snow',
	  tempMin: -10,
	  tempMax: 4
	},
	{
	  name: 'V14',
	  title: 'Mountain Storm - Day - Overcast',
	  sound: 'V14',
	  maxVolume: 1,
	  time: 'Day',
	  weather: 'Overcast',
	  tempMin: 1,
	  tempMax: 12
	},
	{
	  name: 'V30',
	  title: 'Deep Forest - Day - Clear',
	  sound: 'V30',
	  maxVolume: 0.25,
	  time: 'Day',
	  weather: 'Clear',
	  tempMin: 6,
	  tempMax: 17
	},
	{
	  name: 'V30RAIN',
	  title: 'Deep Forest - Day - Rain',
	  sound: 'V30RAIN',
	  time: 'Day',
	  weather: 'Rain',
	  tempMin: 4,
	  tempMax: 15
	},
	{
	  name: 'V04',
	  title: 'Highland Ruins - Day - Rain',
	  sound: 'V04',
	  time: 'Day',
	  weather: 'Rain',
	  tempMin: 3,
	  tempMax: 12
	},
	{
	  name: 'V07',
	  title: 'Rough Seas - Day - Clear',
	  sound: 'V07',
	  time: 'Day',
	  weather: 'Clear',
	  tempMin: 1,
	  tempMax: 12
	},
	{
	  name: 'V20',
	  title: 'Crystal Caves - Day - Clear',
	  sound: 'V20',
	  time: 'Day',
	  weather: 'Clear',
	  tempMin: -2,
	  tempMax: 5
	},
	{
	  name: 'V05RAIN',
	  title: 'Haunted Castle Ruins - Day - Rain',
	  sound: 'V05RAIN',
	  time: 'Day',
	  weather: 'Rain',
	  tempMin: 3,
	  tempMax: 14
	},
	{
	  name: 'V16',
	  title: 'Mirror Pond - Morning - Clear',
	  sound: 'V16',
	  time: 'Morning',
	  weather: 'Clear',
	  tempMin: 5,
	  tempMax: 15
	},
	{
	  name: 'V16RAIN',
	  title: 'Mirror Pond - Day - Rain',
	  sound: 'V16RAIN',
	  time: 'Day',
	  weather: 'Rain',
	  tempMin: 5,
	  tempMax: 15
	},
	{
	  name: 'V16PM',
	  title: 'Mirror Pond - Afternoon - Clear',
	  sound: 'V16',
	  time: 'Afternoon',
	  weather: 'Clear',
	  tempMin: 3,
	  tempMax: 12
	},
	{
	  name: 'CORAL',
	  title: 'Aquarius - Day - Clear',
	  sound: 'CORAL',
	  maxVolume: 0.25,
	  time: 'Day',
	  weather: 'Clear',
	  tempMin: 20,
	  tempMax: 30
	},
	{
	  name: 'V15',
	  title: 'Harbor Town - Night - Overcast',
	  sound: 'V15',
	  time: 'Night',
	  weather: 'Overcast',
	  tempMin: -2,
	  tempMax: 10
	},
	{
	  name: 'V02',
	  title: 'Mountain Fortress - Evening - Clear',
	  sound: 'V02',
	  maxVolume: 1,
	  time: 'Evening',
	  weather: 'Clear',
	  tempMin: 8,
	  tempMax: 15
	},
	{
	  name: 'V28',
	  title: 'Water City Gates - Day - Fog',
	  sound: 'V28',
	  time: 'Day',
	  weather: 'Fog',
	  tempMin: 3,
	  tempMax: 7
	},
	{
	  name: 'V01',
	  title: 'Island Fires - Evening - Clear',
	  sound: 'V29',
	  maxVolumd: 0.25,
	  time: 'Evening',
	  weather: 'Clear',
	  tempMin: 6,
	  tempMax: 12
	},
	{
	  name: 'V09',
	  title: 'Forest Edge - Day - Clear',
	  sound: 'V09',
	  maxVolume: 1,
	  time: 'Day',
	  weather: 'Clear',
	  tempMin: 10,
	  tempMax: 25
	},
	{
	  name: 'V03',
	  title: 'Swamp Cathedral - Day - Fog',
	  sound: 'V03',
	  time: 'Day',
	  weather: 'Fog',
	  tempMin: 0,
	  tempMax: 5
	},
	{
	  name: 'V10',
	  title: 'Deep Swamp - Day - Overcast',
	  sound: 'V10',
	  time: 'Day',
	  weather: 'Overcast',
	  tempMin: 10,
	  tempMax: 17
	},
	{
	  name: 'V05HAUNT',
	  title: 'Haunted Castle Ruins - Night - Clear',
	  sound: 'V05HAUNT',
	  time: 'Night',
	  weather: 'Clear',
	  tempMin: 0,
	  tempMax: 5
	},
	{
	  name: 'V11AM',
	  title: 'Approaching Storm - Afternoon - Clear',
	  sound: 'V02',
	  maxVolume: 1,
	  time: 'Afternoon',
	  weather: 'Clear',
	  tempMin: 7,
	  tempMax: 17
	},
	{
	  name: 'V13',
	  title: 'Pond Ripples - Morning - Clear',
	  sound: 'V13',
	  time: 'Morning',
	  weather: 'Clear',
	  tempMin: 4,
	  tempMax: 7
	},
	{
	  name: 'V17',
	  title: 'Ice Wind - Day - Clear',
	  sound: 'V17',
	  maxVolume: 0.25,
	  time: 'Day',
	  weather: 'Clear',
	  tempMin: -15,
	  tempMax: 3
	},
	{
	  name: 'V25HEAT',
	  title: 'Desert Heat Wave - Day - Clear',
	  sound: 'V25HEAT',
	  time: 'Day',
	  weather: 'Clear',
	  tempMin: 20,
	  tempMax: 50
	},
	{
	  name: 'V27',
	  title: 'Magic Marsh Cave - Night - Clear',
	  sound: 'V25HEAT',
	  time: 'Night',
	  weather: 'Clear',
	  tempMin: 3,
	  tempMax: 15
	},
  ];