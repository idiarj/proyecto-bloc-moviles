import { SessionWrapper } from '../../utils/session/expSession.js'
import session_conf from '../../config/session-conf.json' assert { type: "json" }

export const SessionHandler = new SessionWrapper(session_conf)
