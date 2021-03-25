# This file has been generated by node2nix 1.8.0. Do not edit!

{pkgs ? import (fetchTarball https://github.com/NixOS/nixpkgs/archive/master.tar.gz) {
    inherit system;
  }, system ? builtins.currentSystem, nodejs ? pkgs."nodejs-12_x"}:

let
  nodeEnv = import ./node-env.nix {
    inherit (pkgs) stdenv python2 utillinux runCommand writeTextFile;
    inherit nodejs;
    libtool = if pkgs.stdenv.isDarwin then pkgs.darwin.cctools else null;
  };
in
import ./node-packages.nix {
  inherit (pkgs) fetchurl fetchgit;
  inherit nodeEnv;
}