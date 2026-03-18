CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE user_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE UNIQUE,
    current_weight DECIMAL(5, 2),
    height DECIMAL(5, 2),
    birth_date DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE weight_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    weight DECIMAL(5, 2) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, date)
)

CREATE TABLE notions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    #TODO
    -- user_id
);

#TODO
-- CREATE TABLE tasks (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
--     name VARCHAR(255) NOT NULL,
--     description:TEXT,
--     status:ENUM(
--         'pending',
--         'completed',
--         'rejected',
--         'work'
--     ) DEFAULT 'pending',
--     created_at:TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at:TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     user_id:UUID
-- );

CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM(
        'strength',
        'cardio',
        'stretching',
        'calisthenics'
    ) DEFAULT 'calisthenics',
    place ENUM(
        'street',
        'home',
        'gym',
        'pool'
    ) DEFAULT 'home',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE workout_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    workout_id UUID NOT NULL REFERENCES workouts (id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercises (id) ON DELETE SET NULL,
    order_index INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE exercise_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    workout_exercise_id UUID NOT NULL REFERENCES workout_exercises (id) ON DELETE CASCADE,
    set_number INTEGER NOT NULL,
    reps INTEGER,
    weight DECIMAL(6, 2),
    duration_seconds INTEGER,
    distance DECIMAL(6, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)