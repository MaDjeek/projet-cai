"use client";

import React, { createContext } from "react";
import { AuthContextType } from "../types/Auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);