#!/bin/bash

# ตรวจสอบจำนวนอาร์กิวเมนต์
if [ $# -eq 0 ]; then
  echo "No arguments supplied"
else
  # วนลูปเพื่อแสดงแต่ละอาร์กิวเมนต์
  for arg in "$@"; do
    echo "$arg"
  done
fi
