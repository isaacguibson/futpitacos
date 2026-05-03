package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "usuario", schema = "dbo")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nickname", nullable = false, unique = true, length = 255)
    private String nickname;

    @Column(name = "email", unique = true, length = 255)
    private String email;

    @Column(name = "senha", nullable = false, length = 255)
    private String senha;

    @Column(name = "quantidade_moedas", nullable = false)
    private Integer quantidadeMoedas = 0;

    @Column(name = "quantidade_diamantes", nullable = false)
    private Integer quantidadeDiamantes = 0;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<EnderecoUsuario> enderecos;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Integer getQuantidadeMoedas() {
        return quantidadeMoedas;
    }

    public void setQuantidadeMoedas(Integer quantidadeMoedas) {
        this.quantidadeMoedas = quantidadeMoedas;
    }

    public Integer getQuantidadeDiamantes() {
        return quantidadeDiamantes;
    }

    public void setQuantidadeDiamantes(Integer quantidadeDiamantes) {
        this.quantidadeDiamantes = quantidadeDiamantes;
    }

    public List<EnderecoUsuario> getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(List<EnderecoUsuario> enderecos) {
        this.enderecos = enderecos;
    }
}

