package com.example.fincal;

public class Stats {
    private String allowance, used, left, createdAt;

    public Stats(String allowance, String used, String left, String createdAt) {
        this.allowance = allowance;
        this.used = used;
        this.left = left;
        this.createdAt = createdAt;
    }

    public String getAllowance() {
        return allowance;
    }

    public void setAllowance(String allowance) {
        this.allowance = allowance;
    }

    public String getUsed() {
        return used;
    }

    public void setUsed(String used) {
        this.used = used;
    }

    public String getLeft() {
        return left;
    }

    public void setLeft(String left) {
        this.left = left;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
