FROM dpage/pgadmin4

USER 0

COPY data /var/lib/pgadmin
# doc https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html#mapped-files-and-directories
RUN chown -R 5050:5050 /var/lib/pgadmin

USER 1000
