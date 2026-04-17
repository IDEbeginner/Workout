import React, { useState, useEffect } from ‘react’;
import { CheckCircle2, Clock, Zap, TrendingUp, ChevronDown, LogOut } from ‘lucide-react’;
import axios from ‘axios’;

export default function WorkoutApp() {
const [activeTab, setActiveTab] = useState(‘workout’);
const [selectedDay, setSelectedDay] = useState(‘lundi’);
const [selectedExerciseIdx, setSelectedExerciseIdx] = useState(null);
const [completedExercises, setCompletedExercises] = useState({});
const [sessionsDone, setSessionsDone] = useState(0);
const [runSessions, setRunSessions] = useState({});
const [stravaConnected, setStravaConnected] = useState(false);
const [athleteName, setAthleteName] = useState(’’);
const [accessToken, setAccessToken] = useState(’’);
const [sessionStartTime, setSessionStartTime] = useState(null);
const [currentSessionType, setCurrentSessionType] = useState(’’);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ‘http://localhost:3001’;

useEffect(() => {
const params = new URLSearchParams(window.location.search);
const token = params.get(‘access_token’);
const athleteId = params.get(‘athlete_id’);

```
if (token) {
  setAccessToken(token);
  localStorage.setItem('strava_token', token);
  localStorage.setItem('strava_athlete_id', athleteId);
  setStravaConnected(true);
  window.history.replaceState({}, document.title, window.location.pathname);
  fetchAthleteInfo(token);
} else {
  const savedToken = localStorage.getItem('strava_token');
  if (savedToken) {
    setAccessToken(savedToken);
    setStravaConnected(true);
    fetchAthleteInfo(savedToken);
  }
}
```

}, []);

const fetchAthleteInfo = async (token) => {
try {
const response = await axios.get(`${BACKEND_URL}/api/strava/verify?access_token=${token}`);
if (response.data.valid) {
setAthleteName(response.data.athlete.firstname);
}
} catch (error) {
console.error(‘Error fetching athlete info:’, error);
}
};

const connectStrava = () => {
window.location.href = `${BACKEND_URL}/auth/strava`;
};

const disconnectStrava = () => {
localStorage.removeItem(‘strava_token’);
localStorage.removeItem(‘strava_athlete_id’);
setStravaConnected(false);
setAccessToken(’’);
setAthleteName(’’);
};

const workoutPlan = {
lundi: {
name: ‘Poitrine & Triceps’,
duration: ‘30 min’,
emoji: ‘💪’,
exercises: [
{
name: ‘Pompes classiques’,
sets: ‘3x12’,
rest: ‘60s’,
muscles: ‘Pectoraux, Triceps’,
tips: ‘Garde ton dos droit, coudes à 45° du corps. Descends jusqu'à ce que ta poitrine touche presque le sol.’,
form: ‘Position haute avec bras tendus → Descends lentement → Remonte en poussant’
},
{
name: ‘Pompes inclinées’,
sets: ‘3x10’,
rest: ‘60s’,
muscles: ‘Pectoraux supérieurs’,
tips: ‘Pieds surélevés sur une chaise/lit pour plus d'intensité au haut des pecs.’,
form: ‘Même mouvement qu'une pompe classique mais en position inclinée’
},
{
name: ‘Dips chaise’,
sets: ‘3x10’,
rest: ‘60s’,
muscles: ‘Triceps, Pectoraux’,
tips: ‘Utilise une chaise stable. Descends jusqu'à 90° minimum pour vraiment sentir les triceps.’,
form: ‘Mains sur la chaise → Descends en pliant les coudes → Remonte’
},
{
name: ‘Pompes diamant’,
sets: ‘3x8’,
rest: ‘45s’,
muscles: ‘Triceps’,
tips: ‘Mains très rapprochées (formant un diamant). Focus 100% sur les triceps.’,
form: ‘Mains proches au centre → Descends → Remonte en contractant les triceps’
},
],
},
mercredi: {
name: ‘Dos & Biceps’,
duration: ‘30 min’,
emoji: ‘🔙’,
exercises: [
{
name: ‘Tractions’,
sets: ‘3x8’,
rest: ‘90s’,
muscles: ‘Dos, Biceps’,
tips: ‘Si t'as pas de barre: utilise une porte ou un cadre stable. Menton doit passer au-dessus.’,
form: ‘Bras tendus → Tire vers le haut → Menton au-dessus → Descends contrôlé’
},
{
name: ‘Rowing inverti’,
sets: ‘3x10’,
rest: ‘60s’,
muscles: ‘Dos, Biceps’,
tips: ‘Corps droit en planche. Tire ton corps vers la barre (porte). Excellent pour le dos.’,
form: ‘Corps horizontal sous la barre → Tire le corps vers la barre → Redescends’
},
{
name: ‘Flexions biceps (mains serrées)’,
sets: ‘3x10’,
rest: ‘60s’,
muscles: ‘Biceps’,
tips: ‘Comme des pompes mais mains très proches. Le focus passe aux biceps au lieu de la poitrine.’,
form: ‘Position pompe mains proches → Descends → Remonte’
},
{
name: ‘Superman hold’,
sets: ‘3x20s’,
rest: ‘45s’,
muscles: ‘Dos, Ischio-jambiers’,
tips: ‘Bras et jambes tendus en l'air. Contracte ton dos fort. Tiens la position.’,
form: ‘Allongé au sol → Soulève bras et jambes → Tiens 20 secondes’
},
],
},
vendredi: {
name: ‘Jambes & Cardio’,
duration: ‘35 min’,
emoji: ‘🦵’,
exercises: [
{
name: ‘Squats classiques’,
sets: ‘4x15’,
rest: ‘60s’,
muscles: ‘Quadriceps, Fessiers’,
tips: ‘Descends comme si tu t'assis sur une chaise. Genou ne dépasse pas la pointe du pied.’,
form: ‘Debout → Descends en pliant les genoux → Remonte en poussant’
},
{
name: ‘Fentes alternées’,
sets: ‘3x12’,
rest: ‘60s’,
muscles: ‘Quadriceps, Fessiers’,
tips: ‘Alterne les jambes. Chaque jambe = 1 rep. 90° minimum à chaque genou.’,
form: ‘Pas en avant → Descends → Reviens position de départ → Alterne’
},
{
name: ‘Jump squats’,
sets: ‘3x12’,
rest: ‘90s’,
muscles: ‘Quadriceps, Cardio’,
tips: ‘Explosif! Saque-toi à chaque rep. Atterris doucement. C'est intense.’,
form: ‘Squat complet → Saute explosif vers le haut → Atterris → Répète’
},
{
name: ‘Glute bridges’,
sets: ‘3x15’,
rest: ‘45s’,
muscles: ‘Fessiers’,
tips: ‘Couché au sol, jambes à 90°. Serre les fesses en haut. Ressens la contraction.’,
form: ‘Couché dos au sol → Lève les fesses vers le ciel → Serre en haut → Redescends’
},
{
name: ‘Burpees’,
sets: ‘3x8’,
rest: ‘120s’,
muscles: ‘Full body + Cardio’,
tips: ‘Squat → Planche → Pompe → Jump. Mouvements explosifs. Récup importante après.’,
form: ‘Squat → Kick back en planche → Pompe → Jump explosif → Répète’
},
],
},
samedi: {
name: ‘Épaules & Full Body’,
duration: ‘35 min’,
emoji: ‘🌟’,
exercises: [
{
name: ‘Pike push-ups’,
sets: ‘3x10’,
rest: ‘90s’,
muscles: ‘Épaules’,
tips: ‘Corps en V inversé. Focus 100% épaules. Plus dur qu'une pompe classique.’,
form: ‘Position pompe mais hanche haute (V inversé) → Descends → Remonte’
},
{
name: ‘Pompes classiques’,
sets: ‘3x12’,
rest: ‘60s’,
muscles: ‘Poitrine globale’,
tips: ‘Rappel: dos droit, coudes 45°. Mouvement contrôlé. Pas de rush.’,
form: ‘Position haute → Descends → Remonte’
},
{
name: ‘Planches latérales’,
sets: ‘3x30s’,
rest: ‘45s’,
muscles: ‘Obliques, Core’,
tips: ‘Chaque côté = 30s. Hanche haute. Contracte ton core.’,
form: ‘Corps de côté sur avant-bras → Lève hanche → Tiens’
},
{
name: ‘Planche classique’,
sets: ‘3x40s’,
rest: ‘60s’,
muscles: ‘Core, Stabilisateurs’,
tips: ‘Corps droit du talon à la tête. Serre l'abdomen. Pas de cambrer.’,
form: ‘Avant-bras au sol → Corps droit → Serre → Tiens 40 secondes’
},
{
name: ‘Mountain climbers’,
sets: ‘3x20’,
rest: ‘60s’,
muscles: ‘Core + Cardio’,
tips: ‘Rapide! Ramène les genoux vers la poitrine. Cardio intense.’,
form: ‘Position planche → Alterne genoux rapidement vers poitrine → 20 reps’
},
{
name: ‘Push-ups au mur’,
sets: ‘3x20s’,
rest: ‘45s’,
muscles: ‘Épaules (isométrique)’,
tips: ‘Bras perpendiculaire au mur. Tiens la position. Pas de mouvement.’,
form: ‘Face au mur → Bras à 90° → Pousse contre le mur → Tiens’
},
],
},
};

const runningProgram = {
sessions: [
{
day: ‘Lundi’,
type: ‘Endurance’,
distance: ‘3-4 km’,
time: ‘25-30 min’,
pace: ‘6:30-7:30/km’,
tips: ‘Cours lentement, tu dois pouvoir parler. Focus sur la régularité.’,
intensity: ‘Facile’
},
{
day: ‘Mercredi’,
type: ‘Récupération’,
distance: ‘2-3 km’,
time: ‘20-25 min’,
pace: ‘7:00-8:00/km’,
tips: ‘Très facile. Juste pour te remettre dans le rythme.’,
intensity: ‘Très facile’
},
{
day: ‘Vendredi’,
type: ‘Tempo’,
distance: ‘3 km’,
time: ‘20-22 min’,
pace: ‘6:30-7:00/km’,
tips: ‘Un peu plus rapide. Reste contrôlé, pas au max.’,
intensity: ‘Modéré’
},
{
day: ‘Dimanche’,
type: ‘Long run’,
distance: ‘4-5 km’,
time: ‘30-35 min’,
pace: ‘6:30-7:30/km’,
tips: ‘La plus longue distance de la semaine. Vas à ton rythme.’,
intensity: ‘Facile’
}
]
};

const toggleExercise = (day, index) => {
const key = `${day}-${index}`;
setCompletedExercises(prev => ({
…prev,
[key]: !prev[key],
}));
};

const startRunSession = (day) => {
setSessionStartTime(new Date());
setCurrentSessionType(day);
alert(`Session lancée! Ouvre Strava et enregistre ta course. Quand c'est fait, reviens ici et valide.`);
};

const completeRunSession = async (day) => {
const duration = sessionStartTime ? Math.round((new Date() - sessionStartTime) / 60000) : 0;

```
if (stravaConnected && accessToken) {
  const session = runningProgram.sessions.find(s => s.day === day);
  const distance = parseFloat(session.distance.split('-')[0]) * 1000;

  const activityData = {
    name: `${session.type} - Gains at Home`,
    type: 'Run',
    start_date_local: new Date(sessionStartTime).toISOString(),
    elapsed_time: duration * 60,
    distance: distance,
    description: `${session.type} - ${session.distance}`,
  };

  try {
    await axios.post(`${BACKEND_URL}/api/strava/activity`, {
      access_token: accessToken,
      activity_data: activityData,
    });
    alert('✅ Activité enregistrée sur Strava!');
  } catch (error) {
    console.error('Error uploading to Strava:', error);
    alert('⚠️ Erreur lors du sync Strava, mais la session est marquée localement');
  }
}

setRunSessions(prev => ({
  ...prev,
  [day]: true,
}));
setSessionStartTime(null);
setCurrentSessionType('');
```

};

const toggleRunSession = (day) => {
setRunSessions(prev => ({
…prev,
[day]: !prev[day],
}));
};

const currentWorkout = workoutPlan[selectedDay];
const completedCount = Object.values(completedExercises).filter(Boolean).length;
const completedRunCount = Object.values(runSessions).filter(Boolean).length;

const markSessionComplete = () => {
if (completedCount > 0) {
setSessionsDone(sessionsDone + 1);
setCompletedExercises({});
alert(‘🔥 Beau travail ! Séance enregistrée.’);
}
};

const days = [‘lundi’, ‘mercredi’, ‘vendredi’, ‘samedi’];

return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
<div className="max-w-7xl mx-auto p-4 sm:p-6">
{/* Header */}
<div className="mb-8 border-b border-gray-700 pb-6">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-3">
<h1 className=“text-5xl font-black text-white” style={{ fontFamily: ‘“Courier Prime”, monospace’ }}>
GAINS AT HOME
</h1>
<span className="text-4xl">💪</span>
</div>

```
        {/* Strava Connection */}
        <div className="flex items-center gap-3">
          {stravaConnected ? (
            <div className="flex items-center gap-3 bg-orange-900 px-4 py-2 rounded-lg border border-orange-500">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                🏃
              </div>
              <div className="text-white">
                <p className="text-xs text-gray-300">Connecté</p>
                <p className="font-semibold">{athleteName}</p>
              </div>
              <button
                onClick={disconnectStrava}
                className="ml-2 p-1 hover:bg-orange-800 rounded transition-all"
              >
                <LogOut size={16} className="text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={connectStrava}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
            >
              <span>🔗</span>
              Connecter Strava
            </button>
          )}
        </div>
      </div>

      <p className="text-gray-400 flex items-center gap-2">
        <Zap size={18} className="text-amber-400" />
        Programme complet • Sans équipement • À la maison
      </p>

      {/* Tabs */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => {
            setActiveTab('workout');
            setSelectedExerciseIdx(null);
          }}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            activeTab === 'workout'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          💪 Workout
        </button>
        <button
          onClick={() => setActiveTab('running')}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            activeTab === 'running'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          🏃 Running
        </button>
      </div>
    </div>

    {/* WORKOUT TAB */}
    {activeTab === 'workout' && (
      <>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
            <p className="text-sm opacity-80 font-medium">Séances complétées</p>
            <p className="text-4xl font-black mt-2">{sessionsDone}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
            <p className="text-sm opacity-80 font-medium">Cette séance</p>
            <p className="text-4xl font-black mt-2">{completedCount}/{currentWorkout.exercises.length}</p>
          </div>
        </div>

        {/* Day Selection */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {days.map(day => {
            const dayData = workoutPlan[day];
            return (
              <button
                key={day}
                onClick={() => {
                  setSelectedDay(day);
                  setCompletedExercises({});
                  setSelectedExerciseIdx(null);
                }}
                className={`py-3 px-4 rounded-lg font-bold transition-all text-sm sm:text-base capitalize transform ${
                  selectedDay === day
                    ? 'bg-amber-500 text-white shadow-lg scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <div className="text-lg mb-1">{dayData.emoji}</div>
                {day.slice(0, 3)}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Exercises List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sticky top-6 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{currentWorkout.emoji}</span>
                <h2 className="text-2xl font-bold text-white">{currentWorkout.name}</h2>
              </div>
              <p className="text-gray-400 flex items-center gap-2 mb-6 text-sm">
                <Clock size={16} />
                {currentWorkout.duration}
              </p>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {currentWorkout.exercises.map((ex, idx) => {
                  const key = `${selectedDay}-${idx}`;
                  const isChecked = completedExercises[key] || false;
                  const isSelected = selectedExerciseIdx === idx;

                  return (
                    <div key={idx}>
                      <button
                        onClick={() => setSelectedExerciseIdx(isSelected ? null : idx)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          isSelected
                            ? 'bg-amber-900 border-amber-500 shadow-md'
                            : isChecked
                            ? 'bg-green-900 border-green-500 opacity-50'
                            : 'bg-gray-700 border-gray-600 hover:border-amber-500 hover:bg-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isChecked ? (
                            <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-500 rounded-full flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className={`font-semibold text-sm ${isChecked ? 'text-gray-400 line-through' : 'text-white'}`}>
                              {ex.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{ex.sets} • {ex.rest}</p>
                          </div>
                          {isSelected && <ChevronDown size={18} className="text-amber-400" />}
                        </div>
                      </button>

                      {isSelected && (
                        <button
                          onClick={() => toggleExercise(selectedDay, idx)}
                          className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-3 rounded transition-all"
                        >
                          ✓ Marquer comme complété
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Exercise Details */}
          <div className="lg:col-span-2">
            {selectedExerciseIdx !== null ? (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {currentWorkout.exercises[selectedExerciseIdx].name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {currentWorkout.exercises[selectedExerciseIdx].sets} • {currentWorkout.exercises[selectedExerciseIdx].rest} repos
                  </p>
                  <p className="text-amber-400 text-sm mt-2">
                    Muscles: {currentWorkout.exercises[selectedExerciseIdx].muscles}
                  </p>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    Exécution
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentWorkout.exercises[selectedExerciseIdx].form}
                  </p>
                </div>

                <div className="bg-amber-900 border border-amber-700 rounded-lg p-4 mb-6">
                  <p className="text-amber-100 text-sm leading-relaxed">
                    <strong>💡 Conseil important:</strong> {currentWorkout.exercises[selectedExerciseIdx].tips}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-400 text-xs font-medium">Séries × Reps</p>
                    <p className="text-3xl font-black text-amber-400 mt-2">
                      {currentWorkout.exercises[selectedExerciseIdx].sets}
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-400 text-xs font-medium">Repos</p>
                    <p className="text-3xl font-black text-amber-400 mt-2">
                      {currentWorkout.exercises[selectedExerciseIdx].rest}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleExercise(selectedDay, selectedExerciseIdx)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  ✓ C'est bon, j'ai fait !
                </button>
              </div>
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center shadow-lg">
                <p className="text-gray-400 text-lg">👈 Clique sur un exercice pour voir les détails</p>
              </div>
            )}
          </div>
        </div>

        {completedCount > 0 && (
          <button
            onClick={markSessionComplete}
            className="mt-8 w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            <TrendingUp size={20} />
            Marquer la séance comme complétée ({completedCount}/{currentWorkout.exercises.length})
          </button>
        )}
      </>
    )}

    {/* RUNNING TAB */}
    {activeTab === 'running' && (
      <>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-5 text-white shadow-lg">
            <p className="text-sm opacity-80 font-medium">Sessions cette semaine</p>
            <p className="text-4xl font-black mt-2">{completedRunCount}/4</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-5 text-white shadow-lg">
            <p className="text-sm opacity-80 font-medium">Distance hebdo</p>
            <p className="text-4xl font-black mt-2">12-17 km</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {runningProgram.sessions.map((session, idx) => {
            const isCompleted = runSessions[session.day] || false;
            const isRunning = currentSessionType === session.day;

            return (
              <div
                key={idx}
                className={`border-2 rounded-xl p-6 transition-all ${
                  isCompleted
                    ? 'bg-green-900 border-green-500 opacity-70'
                    : isRunning
                    ? 'bg-blue-900 border-blue-500 shadow-lg'
                    : 'bg-gray-800 border-gray-700 hover:border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{session.day}</h3>
                    <p className="text-blue-400 font-semibold">{session.type}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (isRunning) {
                        completeRunSession(session.day);
                      } else if (!isCompleted) {
                        startRunSession(session.day);
                      } else {
                        toggleRunSession(session.day);
                      }
                    }}
                    className={`p-2 rounded-lg transition-all ${
                      isCompleted
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : isRunning
                        ? 'bg-blue-600 text-white hover:bg-blue-700 animate-pulse'
                        : 'bg-gray-700 text-gray-400 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    {isCompleted ? '✓' : isRunning ? '▶' : '○'}
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">Distance</p>
                    <p className="text-xl font-bold text-white">{session.distance}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Durée</p>
                      <p className="font-bold text-blue-400">{session.time}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Allure</p>
                      <p className="font-bold text-blue-400">{session.pace}</p>
                    </div>
                  </div>

                  <div className="bg-blue-900 border border-blue-700 rounded-lg p-3">
                    <p className="text-blue-100 text-sm">
                      <strong>💡</strong> {session.tips}
                    </p>
                  </div>

                  <p className="text-gray-400 text-xs">
                    Intensité: <span className="text-amber-400 font-semibold">{session.intensity}</span>
                  </p>

                  {stravaConnected && isRunning && (
                    <div className="bg-orange-900 border border-orange-500 rounded-lg p-3 text-center">
                      <p className="text-orange-100 text-sm font-semibold">
                        🔗 Strava actif - Enregistre sur Strava!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-8 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">🏃</span>
            Running - Conseils importants
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-300 text-sm">
            <div>
              <p className="font-semibold text-blue-400 mb-1">👟 Équipement</p>
              <p>De bonnes chaussures de running c'est pas du luxe. Investis dedans.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-400 mb-1">💧 Hydratation</p>
              <p>Bois de l'eau avant, pendant et après. Pas d'attente pour la fin.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-400 mb-1">🌡️ Allure</p>
              <p>L'allure d'endurance = tu dois pouvoir parler. Sinon c'est trop rapide.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-400 mb-1">📍 Progression</p>
              <p>Augmente de 10% max par semaine. Trop rapide = blessure garantie.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-400 mb-1">⏰ Récupération</p>
              <p>Au moins 1 jour complet de repos entre les sessions intensives.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-400 mb-1">🏃 Repos jour</p>
              <p>Au moins 1 jour par semaine sans rien. Tu mérites le repos.</p>
            </div>
          </div>
        </div>
      </>
    )}

    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-8 shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-xl">📋</span>
        Notes importantes
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 text-gray-300 text-sm">
        <div>
          <p className="font-semibold text-amber-400 mb-1">📈 Progression</p>
          <p>Chaque semaine, essaie +1-2 reps ou -10s de repos</p>
        </div>
        <div>
          <p className="font-semibold text-amber-400 mb-1">⏰ Récupération</p>
          <p>48h minimum entre deux séances du même groupe</p>
        </div>
        <div>
          <p className="font-semibold text-amber-400 mb-1">🥗 Nutrition</p>
          <p>~159g protéines/jour + calories en surplus</p>
        </div>
        <div>
          <p className="font-semibold text-amber-400 mb-1">😴 Sommeil</p>
          <p>Après 12h de nuit, max 1-2 jours avant d'attaquer</p>
        </div>
        <div>
          <p className="font-semibold text-amber-400 mb-1">🔥 Échauffement</p>
          <p>5 min léger avant (jump squats, rotations)</p>
        </div>
        <div>
          <p className="font-semibold text-amber-400 mb-1">💪 Forme</p>
          <p>Mieux vaut 8 bonnes reps que 12 pourries</p>
        </div>
      </div>
    </div>

    <div className="text-center mt-12 text-gray-500 text-sm">
      <p>Fais gaffe à toi. Bonne chance les gains. 🚀</p>
    </div>
  </div>
</div>
```

);
}
